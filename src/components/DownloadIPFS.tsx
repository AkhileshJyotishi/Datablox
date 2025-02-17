const DownloadButton = ({ipfsUrl,title}:{ipfsUrl:string,title:string}) => {
    const downloadFile = async () => {
      try {
        const response = await fetch(ipfsUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    };
  
    return (
      <button onClick={downloadFile} className="download-button">
        Download File
      </button>
    );
  };
  export default DownloadButton;