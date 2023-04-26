const { google } = require('googleapis');

function uploadToGDrive(file){
    
    // First, authorize your application with Google Drive API using your client ID and secret
    const auth = new google.auth.GoogleAuth({
        keyFile: './serviceaccount.json',
        scopes: ['https://www.googleapis.com/auth/drive'],
    });


    // create a new instance of the drive API
    const drive = google.drive({
        version: 'v3',
        auth,
    });

    // Define the file metadata and content
    const fileMetadata = {
        name: 'myFile.svg',
        parents: ['1UExC1HbHJZ8nVMMPKXnjMMBkvt02aHUB'] // ID of the folder where you want to upload the file
    };

    const media = {
        mimeType: 'image/svg',
        body: file,
    };

    let id = null
    
    // Upload the file to Google Drive
    drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        }, 
        (err, file) => {
            if (err) {
                console.error(err);
            } else {
                id = file.data.id
                console.log(`File ID: ${file.data.id}`);
            }
        }
    );

    return id
}


export default uploadToGDrive