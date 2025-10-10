import React, { useRef, useState } from 'react';

function VoiceNoteRecorder({ onSend }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new window.MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(blob));
      if (onSend) onSend(blob);
      audioChunks.current = [];
    };
    setMediaRecorder(recorder);
    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={recording ? stopRecording : startRecording} style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 500 }}>
        {recording ? 'Stop Recording' : 'Record Voice Note'}
      </button>
      {audioURL && (
        <audio controls src={audioURL} style={{ display: 'block', marginTop: 12 }} />
      )}
    </div>
  );
}

export default VoiceNoteRecorder;
