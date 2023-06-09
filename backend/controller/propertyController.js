const pinataSDK = require('@pinata/sdk');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Web3 = require('web3');
const fs = require('fs')
dotenv.config();

const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hid","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"PropertyForSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hid","type":"uint256"},{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"PropertySold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"hid","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"uri","type":"string"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"SaleCanceled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"_hid","type":"uint256"}],"name":"Buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"NumberOfProperty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_image","type":"string"}],"name":"Sale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_hid","type":"uint256"}],"name":"cancelSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"hMap","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"uint256","name":"hid","type":"uint256"},{"internalType":"string","name":"image","type":"string"},{"internalType":"bool","name":"ForSale","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const ContractAddress = process.env.CONTRACT;
const property = require('../models/propertyModelSchema');
const path = require('path');

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.PROVIDER));
const contract = new web3.eth.Contract(abi, ContractAddress);


let fileName;
// let path;


// console.log(path + fileName);


const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const pinata = new pinataSDK(apiKey, apiSecret);
const testPinataConnection = () => {
    pinata.testAuthentication().then((result) => {
        //handle successful authentication here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
// let data;


const options = {
    pinataMetadata: {
        name: "MyNFTName",
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};

const pinJSONtoIPFS = (body) => {
    return pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        console.log(result);
        return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}
const pinFiletoIPFS = () => {
    console.log("=====================");
    let file = path + fileName;

    console.log(path + fileName);
    console.log("=-=-==-=--==--==--=--==--=--==");
    // let file2 = path + fileName;
    console.log(file);
    console.log("=====================");
    const readableStreamForFile = fs.createReadStream(path.join('public','images',fileName));
    // console.log(readableStreamForFile);
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        console.log(result);
        // data = result.IpfsHash;
        console.log("data");
        return (`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
    }).catch((err) => {
        //handle error here
        console.log("error" + err);
    });


}
async function getMetaData() {
    const imageUrl = await pinFiletoIPFS();
    console.log("hey");
    console.log(imageUrl);
    const body = {
        name: 'FGH',
        description: 'This is an example of Metadata stored in NFT.',
        image: imageUrl
    };
    const metadata = await pinJSONtoIPFS(body);
    console.log(metadata);
    return (metadata);
    // https://gateway.pinata.cloud/ipfs/QmXYhbsuM7yqBqCKCCzk2uH5CSdFRSNXWQae8dtBQA75eG
}
// uploadfileToPinata();
// getMetaData();

module.exports = {
    uploadDocuments: async (req, res) => {
        try {
            // if (!req.body.fileHash) {
            //     res.status(400)
            //     return res.json({ error: "fileHash is required" })
            // }
            const number = await contract.methods.NumberOfProperty().call();
            // const number = await property.countDocuments()
            console.log(number + 1);
            // console.log(req.user.id);
            // console.log(req.body.title);
            // console.log(req.body.type);
            // console.log("----------");
            // console.log(req.body.location);
            // console.log(req.body.Address);
            // console.log("----------");
            // console.log(req.body.desc);
            fileName = await req.body.img;
            console.log(req.body.img);
            const newfile = new property({
                propertyid: (Number(number) + 1),
                currentOwner: req.user.id,
                title: req.body.title,
                type: req.body.type,
                desc: req.body.desc,
                img: req.body.img,
                image: await pinFiletoIPFS(),
                metadata: await getMetaData(),
                address: req.body.Address,
                location: req.body.location,
                city: req.body.City,
                price: req.body.price,
                sqmeters: req.body.sqmeters,
                rooms: req.body.Rooms,
                ForSale: true
            });
            // fileCollection.push(newfile);
            // const result = await fileCollection.insertOne({newfile})
            const val = await newfile.save();
            res.json(val);

            console.log("Upload");
            // res.json(newfile)
        } catch (err) {
            console.log("ERRRRRRRRRRRRRRRRRRRRRr");
            console.log(err);
        }
    },
    changeFile: async (req, res) => {
        try {


            // fileName = await req.body.filew;
            // path = await req.body.path;
            // file = (path + fileName);
            file = await req.body.filew;
            console.log("FileeNAME");
            console.log(file);
            res.json(fileName);
            console.log("file changed");
        } catch (err) {
            console.log("EEEERRREEEEERRRRRR");
            console.log(err);
        }
    },
    getDocuments: async (req, res) => {
        try {
            const result = await property.find()
            // console.log(result);
            console.log("hello");
            res.json(result);

        } catch (err) {
            console.log(err);
        }
    },
    getDocumentsById: async (req, res) => {
        try {
            const properti = await property.findById(req.params.id).populate('currentOwner', '-password')

        // if (!property) {
        //     throw new Error('No such property with that id')
        // } else {
        //     console.log(property.json);
        //     return res.status(200).json(property)
        // }
            const result = await property.find()
            // console.log(result);
            console.log("hello");
            res.json(properti);

        } catch (err) {
            console.log(err);
        }
    }

}