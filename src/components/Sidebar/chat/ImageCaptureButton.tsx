import { RiScreenshot2Line } from 'react-icons/ri'

interface ImageCaptureButtonProps {
  addMessageDraftFile: (blob: Blob) => void
}

const ImageCaptureButton = ({
  addMessageDraftFile,
}: ImageCaptureButtonProps) => {
  const handleScreenshotClick = async () => {
    const imageBlob: Blob = await new Promise((resolve) => {
      window.parent.postMessage({ action: 'get-screenshot-image' }, '*')
      window.addEventListener('message', function (event) {
        const { action, payload } = event.data
        if (action === 'get-screenshot-image') {
          resolve(payload)
        }
      })
    })

    addMessageDraftFile(imageBlob as Blob)
  }
  return (
    <button
      title="BETA: Take a screenshot and send it to the chat. It will not work on some websites."
      onClick={handleScreenshotClick}
      type="button"
      className="cdx-bg-neutral-300 cdx-text-neutral-500 dark:cdx-text-neutral-200 dark:cdx-bg-neutral-800 cdx-p-2 cdx-rounded"
    >
      <RiScreenshot2Line size={20} />
    </button>
  )
}

export default ImageCaptureButton