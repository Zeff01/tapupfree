import Link from "next/link"
import Image from "next/image"
export default function CodibilityLogo() {
    return (
        <Link href={process.env.NEXT_PUBLIC_CODIBILITY_LINK ?? ""} target="_blank">
            <Image 
            src={"/assets/codebility.svg"}
            width={300}
            height={100}
            alt="codibility logo"
            className="w-[100px]"
            />
        </Link>
    )
}