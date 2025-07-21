'use server';
/**
 * @fileOverview Converts text to a multi-speaker interview-style audio overview.
 */
import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {
  GenerateAudioInput,
  GenerateAudioInputSchema,
  GenerateAudioOutput,
  GenerateAudioOutputSchema,
} from '@/ai/schemas/audio-overview';
import wav from 'wav';
import {z} from 'genkit';

export async function generateAudio(
  input: GenerateAudioInput
): Promise<GenerateAudioOutput> {
  return generateAudioFlow(input);
}

const toWav = async (
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });
    const bufs: Buffer[] = [];
    writer.on('data', (chunk) => bufs.push(chunk));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
    writer.on('error', reject);
    writer.write(pcmData);
    writer.end();
  });
};

const interviewPrompt = ai.definePrompt({
  name: 'interviewScriptPrompt',
  input: {
    schema: z.object({
      length: z.enum(['short', 'long']),
      content: z.string(),
    }),
  },
  output: {
    schema: z.object({
      script: z.string().describe('The interview script, with speaker turns labeled as Speaker1 and Speaker2.')
    })
  },
  prompt: `You are a scriptwriter. Your task is to create an engaging interview script based on the provided document content about the DLDCHAIN project.

The interview should be between two speakers:
- Speaker1: A knowledgeable and inquisitive interviewer.
- Speaker2: A project expert from DLDCHAIN, providing detailed answers.

The script must be formatted with "Speaker1:" and "Speaker2:" to delineate turns.
The desired length of the interview is {{{length}}}. A 'short' interview should be around 200-300 words, and a 'long' interview should be around 500-700 words.

Here is the document content to base the interview on:
{{{content}}}

Generate the script now.
`
});


const generateAudioFlow = ai.defineFlow(
  {
    name: 'generateAudioFlow',
    inputSchema: GenerateAudioInputSchema,
    outputSchema: GenerateAudioOutputSchema,
  },
  async ({content, length}) => {
    // Step 1: Generate the interview script
    const { output: scriptOutput } = await interviewPrompt({content, length});
    if (!scriptOutput?.script) {
        throw new Error('Failed to generate interview script.');
    }
    const interviewScript = scriptOutput.script;

    // Step 2: Generate multi-speaker audio from the script
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Speaker1', // The Interviewer
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Algenib' },
                },
              },
              {
                speaker: 'Speaker2', // The Expert
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Achernar' },
                },
              },
            ],
          },
        },
      },
      prompt: interviewScript,
    });

    if (!media) {
      throw new Error('No audio media returned from the model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audio: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);
