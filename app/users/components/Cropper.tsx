import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Slider } from '@/components/ui/slider';
import { createPortal } from 'react-dom';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  //   convertToPixelCrop,
} from 'react-image-crop';
import { canvasPreview } from '@/lib/canvasPreview';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

type CropperProps = {
  setFileName: Dispatch<SetStateAction<string>>;
  aspect: number;
  changeImage(img: string): void;
  maxHeight?: number;
  circularCrop?: boolean;
};

export default function Cropper({
  setFileName,
  aspect,
  changeImage,
  maxHeight,
  circularCrop = false,
}: CropperProps) {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  //   const [aspect, setAspect] = useState<number | undefined>(16 / 6)
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((m) => !m);
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      setFileName(e.target.files[0].name);
      //   toggleModal()
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileAsDataURL = event.target?.result;
      if (typeof fileAsDataURL === 'string') {
        // You can use fileAsDataURL as needed
        console.log({ fileAsDataURL });
        changeImage(fileAsDataURL);

        toggleModal();
      }
    };
    reader.readAsDataURL(blob);

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    // ---THIS IS USED TO DOWNLOAD THE CROPPED IMAGES---
    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current
    //   hiddenAnchorRef.current.click()
    // }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
  );

  //   function handleToggleAspectClick() {
  //     if (aspect) {
  //       setAspect(undefined)
  //     } else {
  //       setAspect(16 / 9)

  //       if (imgRef.current) {
  //         const { width, height } = imgRef.current
  //         const newCrop = centerAspectCrop(width, height, 16 / 9)
  //         setCrop(newCrop)
  //         // Updates the preview
  //         setCompletedCrop(convertToPixelCrop(newCrop, width, height))
  //       }
  //     }
  //   }

  return (
    <div className="cropper w-28 h-28 rounded-full overflow-hidden">
      <Input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="w-full h-full invisible"
        onClick={toggleModal}
      />

      {createPortal(
        <>
            {showModal && (
              <div className="z-10 fixed top-0 right-0 w-screen h-screen">
                <div className="z-20 w-full h-full bg-black opacity-80" />
                <div className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-full bg-white flex flex-col items-center gap-y-8 overflow-y-scroll  justify-between">
                  <div className="pt-8 w-full flex flex-col items-center">
                    {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
                    <div className="w-[400px] flex flex-col items-center gap-y-2">
                      <p className="pb-4 font-bold text-2xl">
                        Select the Image
                      </p>
                      <label htmlFor="scale" className="text-xl font-semibold">
                        Zoom
                      </label>
                      <div className="flex flex-row items-center gap-2 w-full pb-4">
                        <Minus />
                        <Slider
                          defaultValue={[1]}
                          max={3}
                          step={0.05}
                          min={0.5}
                          onValueChange={(v) => {
                            setScale(v[0]);
                          }}
                        />
                        <Plus />
                      </div>
                    </div>
                    <div className="w-full flex flex-row gap-6 justify-center items-center">
                      <Button
                        variant={'outline'}
                        type="button"
                        onClick={toggleModal}
                        className="w-20"
                      >
                        Cancel
                      </Button>
                      {!!imgSrc && (
                        <Button
                          type="button"
                          onClick={onDownloadCropClick}
                          className="w-20"
                        >
                          Save
                        </Button>
                      )}
                    </div>
                    {/* <div>
                            <button onClick={handleToggleAspectClick}>
                                Toggle aspect {aspect ? 'off' : 'on'}
                            </button>
                        </div> */}
                  </div>
                  <div className="px-2">
                    {!!imgSrc && (
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        // minWidth={400}
                        minHeight={100}
                        maxHeight={maxHeight}
                        circularCrop={circularCrop}
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc}
                          style={{ transform: `scale(${scale})` }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    )}
                  </div>
                  {!!completedCrop && (
                    <>
                      <div>
                        <canvas
                          className="shadow-md hidden"
                          ref={previewCanvasRef}
                          style={{
                            border: '1px dashed black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                          }}
                        />
                      </div>
                      <div>
                        {/* <div style={{ fontSize: 12, color: '#666' }}>
                                If you get a security error when downloading try opening the
                                Preview in a new tab (icon near top right).
                                </div> */}
                        <a
                          href="#hidden"
                          ref={hiddenAnchorRef}
                          download
                          style={{
                            position: 'absolute',
                            top: '-200vh',
                            visibility: 'hidden',
                          }}
                        >
                          Hidden download
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
        </>,
        document.body
      )}
    </div>
  );
}
