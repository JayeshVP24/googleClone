import { XIcon, MicrophoneIcon, SearchIcon } from "@heroicons/react/solid"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import Avatar from "./avatar"
import HeaderOptions from "./HeaderOptions"

interface IHeader {}

const Header: React.FC<IHeader> = () => {
    const router = useRouter()
    const [searchInput, setSearchInput] = useState<string | number | readonly string[] | undefined>(router.query.term as string)

    const search = (e: FormEvent<HTMLFormElement>) =>  {
        e.preventDefault()
        
        if(!searchInput) return 

        router.push(`/search?term=${searchInput}`)
    }
    return (
        <header className="sticky top-0 bg-white" >
            <div className="flex w-full p-6 items-center" >
                <Image
                    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                    height={40}
                    width={120}
                    alt="Google Logo"
                    onClick={()=> router.push("/")}
                    className="cursor-pointer"
                />

                <form
                    onSubmit={search}
                    className="flex border border-gray-200 rounded-full
                shadow-lg max-w-3xl items-center px-6 py-3 ml-10 mr-5
                flex-grow" >
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)} type="text"
                        className="flex-grow w-full focus:outline-none"
                    />

                    <XIcon className="h-7 text-gray-500 cursor-pointer
                    transition duration-100 transform hover:scale-125
                    sm:mr-3
                    " 
                        onClick={()=> setSearchInput("") }
                        visibility={searchInput ? "visible" : "hidden"}
                    />

                    <span className="border-l-2 pl-4 border-gray-200 
                    h-6 hidden sm:inline-flex" ></span>

                    <SearchIcon onClick={e => {
                        if(!searchInput) return 

                        router.push(`/search?term=${searchInput}`)
                    } } className="h-6 mr-3 hidden sm:inline-flex
                    text-blue-500 cursor-pointer
                    transition duration-100 transform hover:scale-125" />

                    <button type="submit" hidden>Search</button>
                </form>

                <Avatar url="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"  />
            </div>

            <HeaderOptions />
        </header>
    )
}

export default Header