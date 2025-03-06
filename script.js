//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(imageUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        resolve(img); // Resolve with the image element
      };

      img.onerror = () => {
        reject(new Error(`Failed to load image at ${imageUrl}`)); // Reject with error
      };
    });
  }

  // Function to download all images
  function downloadImages(images) {
    const imagePromises = images.map((image) => downloadImage(image.url));

    // Show loading spinner
    document.getElementById("loading").style.display = "block";
    document.getElementById("error").style.display = "none"; // Hide error messages

    // Use Promise.all to download all images
    Promise.all(imagePromises)
      .then((imageElements) => {
        // Hide loading spinner
        document.getElementById("loading").style.display = "none";

        // Append images to the output div
        imageElements.forEach((img) => {
          const imgElement = document.createElement("img");
          imgElement.src = img.src;
          document.getElementById("output").appendChild(imgElement);
        });
      })
      .catch((error) => {
        // Hide loading spinner and show error message
        document.getElementById("loading").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = error.message;
      });
  }

  // Handle button click
  btn.addEventListener("click", () => {
    downloadImages(images);
  });

