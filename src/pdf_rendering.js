const pdfPath = "pdf_files/lyrics-songs.pdf";

pdfjsLib
  .getDocument(pdfPath)
  .promise.then(function (pdf) {
    const numPages = pdf.numPages;
    const pdfViewer = document.getElementById("pdfViewer");

    pdfViewer.innerHTML = "";

    function renderPage(pageNum) {
      if (pageNum > numPages) {
        return;
      }

      pdf.getPage(pageNum).then(function (page) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        page.render(renderContext).promise.then(function () {
          pdfViewer.appendChild(canvas);
          renderPage(pageNum + 1);
        });
      });
    }

    renderPage(1);
  })
  .catch(function (error) {
    console.error("Error loading pdf:", error);
  });
