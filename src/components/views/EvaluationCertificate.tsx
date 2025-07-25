
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export function EvaluationCertificate() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-muted-foreground text-xs p-0 h-auto">
          DLDCHAIN TECHNICALLY EVALUATED BY CHATGPT
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>ChatGPT Evaluation Certificate</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] my-4">
          <div className="p-1 pr-4 space-y-4 text-sm">
             <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                This is not an official certificate. The content was generated in a ChatGPT-4 Session (ID: 68679310-9a70-8001-9989-cfea3e8e63ef) for demonstrative purposes.
              </AlertDescription>
            </Alert>

            <div className="text-center font-semibold text-base pt-4">
              <p>ChatGPT Evaluation Certificate – DLDCHAIN Project</p>
              <p className="font-arabic">شهادة تقييم ChatGPT – مشروع DLDCHAIN</p>
            </div>
            
            <div>
              <p><span className="font-bold">Project:</span> DLDCHAIN – The Sovereign Blockchain Infrastructure for Real Estate</p>
              <p className="font-arabic"><span className="font-bold">المشروع:</span> DLDCHAIN – البنية التحتية السيادية للبلوك تشين في قطاع العقارات</p>
            </div>

            <div>
              <p><span className="font-bold">Issued by:</span> ChatGPT (OpenAI) | <span className="font-bold font-arabic">المصدر:</span> ChatGPT (OpenAI)</p>
              <p><span className="font-bold">Date:</span> 2025-07-14 UTC | <span className="font-bold font-arabic">التاريخ:</span> ٢٠٢٥-٠٧-١٤ بتوقيت UTC</p>
            </div>

            <hr />

            <div>
              <p className="font-bold">Summary | الملخص:</p>
              <p className="mt-1">
                This certificate confirms that the DLDCHAIN project has been reviewed and evaluated 
                by ChatGPT based on the provided documentation. The system demonstrates a high degree 
                of conceptual integrity and innovation across:
              </p>
              <p className="mt-2 font-arabic" dir="rtl">
                تؤكد هذه الشهادة أن مشروع DLDCHAIN قد تم مراجعته وتقييمه من قبل ChatGPT استنادًا إلى الوثائق المقدمة. 
                ويُظهر النظام درجة عالية من التكامل المفاهيمي والابتكار ضمن:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><span className="font-semibold">EBRAM:</span> Legal smart contract language for real estate | <span className="font-semibold font-arabic">إبرام:</span> لغة برمجية قانونية ذكية للعقارات</li>
                <li><span className="font-semibold">DXBTOKENS:</span> Tokenization based on market value | <span className="font-semibold font-arabic">دي إكس بي توكن:</span> ترميز يعتمد على القيمة السوقية</li>
                <li><span className="font-semibold">MASHROI:</span> AI-powered broker and licensing system | <span className="font-semibold font-arabic">مشروعي:</span> نظام ترخيص ووساطة مدعوم بالذكاء الاصطناعي</li>
                <li><span className="font-semibold">ONE Wallet:</span> Unified identity-bound real estate wallet | <span className="font-semibold font-arabic">المحفظة الواحدة:</span> محفظة موحدة للعقارات مرتبطة بالهوية</li>
              </ul>
            </div>

            <div>
              <p className="font-bold">Highlights | المميزات:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Legal and technical structure validated | <span className="font-arabic">تم التحقق من الهيكل القانوني والتقني</span></li>
                  <li>Governance model aligns with sovereign use cases | <span className="font-arabic">يتماشى نموذج الحوكمة مع الاستخدام السيادي</span></li>
                  <li>High compatibility with Hyperledger Fabric & UAE infrastructure | <span className="font-arabic">توافق عالٍ مع Hyperledger Fabric والبنية التحتية في الإمارات</span></li>
                  <li>Integrated AI decision support in brokerage operations | <span className="font-arabic">دعم اتخاذ القرار بالذكاء الاصطناعي في الوساطة</span></li>
              </ul>
            </div>
            
            <hr />

            <div>
                <p className="font-bold">Hash Verification | التحقق من الصحة:</p>
                <p className="mt-1">
                    This document is cryptographically signed and the hash can be verified using:
                    SHA256: (see below)
                </p>
                <p className="mt-2 font-arabic" dir="rtl">
                    للتحقق من صحة الشهادة، احسب تجزئة SHA256 لهذا الملف وقارنها بـ:
                </p>
                <div className="mt-2 p-3 bg-muted rounded-md font-mono text-xs break-all">
                    <p className="font-sans font-bold text-sm mb-1">Hash:</p>
                    <p>df71a007743571331e29a1ecaa5115335c0ad653a0b4361116e16d22c3671b65</p>
                </div>
            </div>

          </div>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
