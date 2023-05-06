import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { db, storage } from '../../firebase'


import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp, setDoc, doc } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadString, uploadBytesResumable, getStorage, uploadBytes } from 'firebase/storage'
 

export default function InputBox() {
    const {data: session} = useSession()
    const inputRef = useRef(null)
    const filepickrRef = useRef(null)
    const [imageToPost, setImageToPost] = useState(null)

    const metadata = {
        contentType: 'image/jpeg'
      };

    const sendPost = async (event) => {
        event.preventDefault()

        if(!inputRef.current.value) return

        try {
            await addDoc(collection(db, "posts"), {
                message: inputRef.current.value,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                timestamp: serverTimestamp()   
            }).then((docImage) => {
                if (imageToPost) {
                    const storage = getStorage();
                    const storageRef = ref(storage, `posts/${docImage.id}`)
                    const uploadTask = uploadString(storageRef, imageToPost, 'data_url')
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                        .then((url) => {
                            setDoc(doc(db, "posts", docImage.id), { postImage:url }, { merge: true});
                        })  
                    });
                    
                  

                    // uploadTask.on(
                    //     'state_changed',
                    //     null,
                    //     (error) => { alert(error) },
                    //     () => {
                    //         // getDownloadURL(uploadTask.snapshot.ref)
                    //         // .then((url) => {
                    //         //     setDoc(doc(db, "posts", docImage.id), { postImage:url }, { merge: true});
                    //         // })  
                    //         getDownloadURL(uploadTask.snapshot.ref)
                    //         .then((url) => {
                    //             setDoc(doc(db, "posts", docImage.id), { postImage:url }, { merge: true});
                    //         })  
                    //     }
                    // )
                    removeImage()
                    
                                    
                    // uploadtask.on(
                    //     'state_change', 
                    //     null, 
                    //     (error) => console.error(error),
                    //     () => {
                    //         storage.ref("posts")
                    //         .child(doc.id)
                    //         .getDownloadURL()
                    //         .then((url) => {
                    //             addDoc(collection(db, "posts").doc(doc.id).set(
                    //                 {
                    //                     postImage: url,
                    //                 },
                    //                 { merge: true }
                    //             ))
                    //         })
                    //     }
                    // )
                }
            });
        } catch (e) {
        console.error("Error adding document: ", e);
        }
        inputRef.current.value = '';
    }

    const addImageToPost = (event) => {
        const reader = new FileReader();
        if (event.target.files[0]){
            reader.readAsDataURL(event.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }

    const removeImage = () => {
        setImageToPost(null)
    }


    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className='flex space-x-4 p-4 items-center'>
                <Image
                    className='rounded-full'
                    src={session?.user?.image}
                    alt="Profile Img"
                    width={40}
                    height={40}
                />
                
                <form className='flex flex-1'>
                    <input
                        className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' 
                        type='text' 
                        ref={inputRef}
                        placeholder={`Whats on your mind, ${session.user.name}?`} 
                    />
                    <button hidden type='submit' onClick={sendPost}>Submit</button>
                </form>

                {imageToPost && (
                    <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                        <img className='h-10 object-contain' src={imageToPost} alt="" />
                        <p className='text-xs text-red-500 text-center'>Remover</p>
                    </div>
                )}
            </div>
            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500'/>
                    <p className='text-xs sm:text-sm xl:text-base'>Live Video </p>
                </div>
                <div onClick={() => filepickrRef.current.click()} className='inputIcon'>
                    <CameraIcon className='h-7 text-green-400' />
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                    <input ref={filepickrRef} onChange={addImageToPost}  type="file" hidden />
                </div>
                <div className='inputIcon'>
                    <FaceSmileIcon className='h-7 text-yellow-300' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}
