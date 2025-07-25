'use server';
/**
 * @fileOverview A Genkit flow for generating audio summaries of documents.
 *
 * This file defines the 'generateAudioInterview' flow, which takes document content
 * and an interview length preference, and uses a text-to-speech model to generate
 * an audio file in WAV format.
 *
 * - generateAudioInterview: The main flow function.
 * - GenerateAudioInput: The Zod schema for the flow's input.
 * - GenerateAudioOutput: The Zod schema for the flow's structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';

export const GenerateAudioInputSchema = z.object({
  documentContent: z.string().describe("The full text content of the document to be summarized."),
  interviewLength: z.enum(['short', 'long']).describe("The desired length of the audio interview."),
});
export type GenerateAudioInput = z.infer<typeof GenerateAudioInputSchema>;

export const GenerateAudioOutputSchema = z.object({
  audioDataUri: z.string().describe("The generated audio as a data URI in WAV format."),
});
export type GenerateAudioOutput = z.infer<typeof GenerateAudioOutputSchema>;

const summaryPrompt = ai.definePrompt({
    name: 'audioSummaryPrompt',
    input: { schema: GenerateAudioInputSchema },
    output: { schema: z.object({ summary: z.string() }) },
    prompt: `You are an AI assistant for the DLDCHAIN project. Your task is to create a concise script for an audio interview summarizing the provided document. The interview should be between a host and an expert on the project.

    Document Content:
    {{{documentContent}}}

    Based on the document, create a script for a {{interviewLength}} interview.
    - For a 'short' interview, create a script that is about 150-200 words.
    - For a 'long' interview, create a script that is about 300-400 words.

    The script should be natural-sounding and engaging. Start with a brief introduction by the host, followed by a question-and-answer format. Use 'Host:' and 'Expert:' to denote the speakers.
    `,
});

async function toWav(pcmData: Buffer, channels = 1, rate = 24000, sampleWidth = 2): Promise<string> {
    return new Promise((resolve, reject) => {
        const writer = new wav.Writer({
            channels,
            sampleRate: rate,
            bitDepth: sampleWidth * 8,
        });

        const bufs: any[] = [];
        writer.on('error', reject);
        writer.on('data', (d) => bufs.push(d));
        writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
        
        writer.write(pcmData);
        writer.end();
    });
}

export const generateAudioInterviewFlow = ai.defineFlow(
  {
    name: 'generateAudioInterviewFlow',
    inputSchema: GenerateAudioInputSchema,
    outputSchema: GenerateAudioOutputSchema,
  },
  async (input) => {
    // 1. Generate the interview script
    const summaryResponse = await summaryPrompt(input);
    const script = summaryResponse.output?.summary;

    if (!script) {
      throw new Error('Failed to generate interview script.');
    }

    // 2. Convert the script to speech
    const { media } = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                multiSpeakerVoiceConfig: {
                    speakerVoiceConfigs: [
                        {
                            speaker: 'Host',
                            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } },
                        },
                        {
                            speaker: 'Expert',
                            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Achernar' } },
                        },
                    ],
                },
            },
        },
        prompt: script,
    });

    if (!media) {
      throw new Error('Text-to-speech generation failed to return media.');
    }
    
    // 3. Convert PCM to WAV
    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
