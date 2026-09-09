import { useState, useCallback, useRef, useEffect } from "react";

interface UseVoiceAssistantReturn {
  isListening: boolean;
  transcript: string;
  isSupported: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export function useVoiceAssistant(
  onTranscript?: (text: string) => void
): UseVoiceAssistantReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback: nothing to do here, the UI should show text input
      return;
    }

    // Stop any existing session
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    let finalTranscript = transcript;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
          setTranscript(finalTranscript.trim());
          onTranscript?.(finalTranscript.trim());
        } else {
          interim += result[0].transcript;
        }
      }
      if (interim) {
        setTranscript(finalTranscript.trim() + " " + interim);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      if (finalTranscript.trim()) {
        setTranscript(finalTranscript.trim());
        onTranscript?.(finalTranscript.trim());
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [language, transcript, onTranscript]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    onTranscript?.("");
  }, [onTranscript]);

  return {
    isListening,
    transcript,
    isSupported,
    language,
    setLanguage,
    startListening,
    stopListening,
    resetTranscript,
  };
}
