import React, { Component } from 'react'

export default class ImageFormInput extends Component {
    constructor(props) {
        super(props)
        this.FILE_TYPES = 'image/jpeg, image/jpg, image/png, image/bmp'
        this.handleFileChange = this.handleFileChange.bind(this)
        this.bindImage = props.bindImage
        this.setter = props.setter
    }

    //callback function to handle when a file is uploaded to the file input,
    // will be used to convert the image into a base64 encoded string before saving
    // in the database 'localstorage'
    // based on this article: https://medium.com/@blturner3527/storing-images-in-your-database-with-base64-react-682f5f3921c2
    handleFileChange(ev) {
        const file = ev.target.files[0]
        // console.log(ev.target)

        // after confirming the file exists in event.currentTarget.files[0] (since only one file at a time)
        // using a FileReader object: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        // I can asynchronously read the contents of a file, in this case an image and readAsBinaryString
        // after listening for the load event with FileReader.onLoad
        if (file) {
            const fileReader = new FileReader()
            // fileReader.addEventListener('load', ({ target }) => imageSetter(`data:image/png;base64${btoa(target.result)}`))
            // fileReader.onload = ({ target }) => this.setter(`data:image/png;base64${btoa(target.result)}`)(this.setter)
            // fileReader.onload = ({ target }) => {
            //     console.log(`data:image/png;base64${btoa(target.result)}`)
            //     // setter(`data:image/png;base64${btoa(target.result)}`)
            // }
            // let dataString = ''
            // fileReader.onload = (function (binaryString) {
            //     return function ({ target }) {
            //         // data = `data:image/png;base64${btoa(target.result)}`
            //         binaryString = `data:image/png;base64${btoa(target.result)}`
            //         // setter(dataString)
            //     }
            // })(dataString);
            // console.log(dataString)
            // fileReader.onload = ({ target }) => {
            //     // let target = ev.target
            //     // console.log(ev)
            //     // target.binaryString = `${btoa(target.result)}`
            //     dataString = `${btoa(target.result)}`
            // }

            // callback function for the successful reading of a file
            // will get the binary string from the currentTarget.result
            // and will use the binary to ascii function to convert it
            // to something we can store in the database, using an arrow function
            fileReader.onload = ({ target }) => this.setter(`data:image/png;base64${btoa(target.result)}`)
            fileReader.readAsBinaryString(file)
            // console.log(dataString)
            // setImage(fileReader.binaryString)
        }
    }

    render() {
        return (
            <div className="file-field input-field col s12">
                <div className="btn">
                    <span>Photo</span>
                    <input type="file" name="imageFile" accept={this.FILE_TYPES} {...this.bindImage} onChange={this.handleFileChange} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" name="imagePath" type="text" />
                </div>
            </div>
        )
    }
}

