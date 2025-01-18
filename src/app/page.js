'use client'
import { useEffect, useRef, useState } from "react";
import Dropzone from 'react-dropzone'
import ObjectAnnotation from "./ObjectAnnotation";

const fileTypes = ["JPG", "PNG", "GIF"];

const threshold = 0.85;

export default function Home() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [result, setResult] = useState()
  const [isAnalysisInprogress, setIsAnalysisInprogress] = useState(false)
  const worker = useRef()

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../../worker.js', import.meta.url), {
        type: "module"
      })
    }

    worker.current.addEventListener('message', (event) => {
      setIsAnalysisInprogress(false)
      setResult(event?.data || [])
    })

    return () => worker.current.removeEventListener('message');
  }, [])

  const handleChange = (file) => {
    const fileUrl = URL.createObjectURL(file[0])
    setImagePreviewUrl(fileUrl);
    setResult(null)
    setIsAnalysisInprogress(true)
    worker.current?.postMessage({ threshold, file: fileUrl, });
  };

  return (
    <div>
      <h1 className="text-center p-3 pb-0 text-xl font-semibold text-slate-700">
        Object Detection in the Browser
      </h1>
      <div className="p-10 flex justify-center align-center">
        <Dropzone fileTypes={fileTypes} multiple={false} onDrop={handleChange}>
          {({ getRootProps, getInputProps }) => (
            <section className="border-dashed border-green  w-full max-w-[600px]  min-h-[60vh] flex flex-col align-center justify-center  border-2 border-slate-300 rounded-md p-3 mb-5 text-center">

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <p className="text-slate-500">Drag and drop image here, or click to select image file</p>
              </div>

              <div className="relative inline-block mt-5">
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    alt="Uploaded"
                    className="block w-full rounded-md"
                  />
                )}
                {result && result?.length === 0 && <div className="absolute w-full top-[50%] flex justify-center">
                  <p className="bg-red-50 text-slate-500 opacity-90 inline p-2 rounded font-w">No object detected with threshold: {threshold}</p>
                </div>}
                {isAnalysisInprogress && <div className="absolute w-full top-[50%] flex justify-center">
                  <h4 className="bg-slate-50 text-slate-500 opacity-90 inline p-2 rounded">Analyzing...</h4>
                </div>}
                {result?.map((detectedObject, i) => <ObjectAnnotation key={i} detectedObject={detectedObject} />)}
              </div>

            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
