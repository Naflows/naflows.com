import React from 'react';
import AppButton from '../../../../../public/modules/utilities/buttons/visual';
import { popup } from '../../../../../public/modules/utilities/popup';
import fileTransfer from '../../..';
import { storage } from '../../storage/access';

const DisplayUpload = () => {
  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const fileContent = await readFileContent(selectedFile);

      async function Open(content) {
        popup.close();
        console.log('New upload ->',content);
        const Storage = storage.access();
        Storage.articles.push(JSON.parse(content));
        storage.set(Storage);
        window.location.href = '/';
        fileTransfer(content);
      }
      await Open(fileContent);

    } catch (error) {
        console.log(error)
      popup.close();
      popup.new({
        title : "An error occured",
        description : "Please make sure your filetype is either JSON or TXT, and contains a valid code."
      })
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };

  const openFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <AppButton 
        type="blank"
        container={{ text: 'Upload' }}
        action={() => {
          popup.new({
            title: 'Upload a file',
            description: 'Warning: your article will be deleted and replaced by the uploaded file.',
          }, [{
            type: 'filled',
            container: { text: 'Proceed' },
            action: openFileInput,
          }]);
        }}
      />
    </div>
  );
};

export default DisplayUpload;
