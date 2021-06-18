/* eslint-disable @next/next/no-img-element */
interface IAvatar {
    url: string;
}

const Avatar: React.FC<IAvatar> = ({ url }) => {
    return (
        <img
            src={url}
            alt="Profile Picture"
            loading="lazy"
            className="rounded-full cursor-pointer h-10 
            transition duration-150
            transform hover:scale-110 ml-auto "
        />
    );
};

export default Avatar;
