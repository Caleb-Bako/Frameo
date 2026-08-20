import { useState, useRef, useEffect } from "react";
import "./App.css";

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function App() {
  const [captureStream, setCaptureStream] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const displayMediaOptions = {
    video: {
      displaySurface: "window",
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      frameRate: { ideal: 60 },
    },
    audio: false,
  };

  async function startCapture(e) {
    e.preventDefault();

    try {
      const stream =
        await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      setDownloadUrl(null);
      setCaptureStream(stream);

      // If the user ends sharing from the browser's own picker UI,
      // make sure our state (and any in-flight recording) winds down too.
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        stopCapture();
      });
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  }

  function stopCapture() {
    if (!captureStream) return;
    if (isRecording) stopRecordScreen();
    captureStream.getTracks().forEach((t) => t.stop());
    setCaptureStream(null);
  }

  function recordScreen() {
    if (!captureStream || isRecording) return;

    const mimeType = MediaRecorder.isTypeSupported(
      "video/webm; codecs=avc1.424028",
    )
      ? "video/webm; codecs=avc1.424028"
      : "video/webm";

    const chunks = [];
    const recorder = new MediaRecorder(captureStream, {
      mimeType,
      videoBitsPerSecond: 8000000,
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: "video/webm; codecs=avc1.424028",
      });
      setDownloadUrl(URL.createObjectURL(blob));
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setElapsed(0);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  }

  function stopRecordScreen() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = captureStream;
    }
  }, [captureStream]);

  // Clean up the timer if the component unmounts mid-recording.
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const statusState = isRecording
    ? "recording"
    : captureStream
      ? "live"
      : "idle";
  const statusLabel = isRecording
    ? "RECORDING"
    : captureStream
      ? "READY"
      : "IDLE";

  return (
    <div className="app">
      <div className="terrain terrain-top" aria-hidden="true" />

      <header className="header">
        <div
          className={`monitor-icon monitor-icon--${statusState}`}
          aria-hidden="true"
        >
          <div className="monitor-icon__screen">
            <span className="monitor-icon__dot" />
          </div>
          <div className="monitor-icon__stand" />
        </div>
        <div className="header__text">
          <h1 className="title">Screen Recorder</h1>
          <p className="subtitle">craft your capture</p>
        </div>
      </header>

      <main className="panel">
        <div className={`status-bar status-bar--${statusState}`}>
          <span className={`status-light status-light--${statusState}`} />
          <span className="status-text">{statusLabel}</span>
          {isRecording && (
            <span className="status-timer">{formatTime(elapsed)}</span>
          )}
        </div>

        <div className="video-frame">
          <video ref={videoRef} autoPlay playsInline muted />
          {!captureStream && (
            <div className="video-placeholder">
              <span>NO SIGNAL</span>
              <span className="video-placeholder__hint">
                Press START to select a window
              </span>
            </div>
          )}
        </div>

        <div className="controls">
          <button
            className="btn btn--start"
            onClick={startCapture}
            disabled={!!captureStream}
          >
            Start
          </button>
          <button
            className="btn btn--record"
            onClick={recordScreen}
            disabled={!captureStream || isRecording}
          >
            {isRecording ? "Recording…" : "Record"}
          </button>
          <button
            className="btn btn--stop"
            onClick={stopCapture}
            disabled={!captureStream}
          >
            Stop
          </button>
        </div>

        {downloadUrl && (
          <a
            className="btn btn--download"
            href={downloadUrl}
            download="screen-recording.webm"
          >
            ⬇ Download Recording
          </a>
        )}
      </main>

      <div className="terrain terrain-bottom" aria-hidden="true" />
    </div>
  );
}

export default App;
