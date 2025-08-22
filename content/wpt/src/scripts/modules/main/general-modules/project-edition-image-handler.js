const handleImageUpload = (
    files, setImageSrc
) => {
    console.log(event)
    const file = files[0];
    
    const reader = new FileReader();

    reader.onloadend = () => {
        setImageSrc(reader.result);

    };

    if (file && file.size > 200 * 8 ) {
        reader.readAsDataURL(file);
    }
};

export default handleImageUpload;