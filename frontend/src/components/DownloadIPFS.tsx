const DownloadButton = ({ ipfsUrl, title }: { ipfsUrl: string; title: string }) => {
  const downloadFile = async () => {
    try {
      const response = await fetch(ipfsUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading the file:", error)
    }
  }

  return (
    <button
      onClick={downloadFile}
      className="download-button rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]"
    >
      Download File
    </button>
  )
}
export default DownloadButton
