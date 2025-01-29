// Add html2canvas script to the page
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);

script.onload = () => {
    // Wait for all previews to be rendered
    setTimeout(() => {
        const previews = document.querySelectorAll('.skin-preview');
        
        previews.forEach(async (preview) => {
            const gameName = preview.querySelector('.skin-label').textContent.split(' (')[1].slice(0, -1);
            const skinName = preview.querySelector('.skin-label').textContent.split(' (')[0].toLowerCase().replace(/\s+/g, '-');
            
            try {
                const canvas = await html2canvas(preview.querySelector('div:first-child'), {
                    backgroundColor: null,
                    scale: 2
                });
                
                // Convert to PNG and download
                const link = document.createElement('a');
                link.download = `${skinName}.png`;
                link.href = canvas.toDataURL('image/png');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error generating image:', error);
            }
        });
    }, 1000);
}; 