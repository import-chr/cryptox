import { SIZES } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const PoweredByCGAPI = ({ svgClassName, size = "md" }: PoweredByCGAPIProps) => {
  return (
    <Link
      href="https://www.coingecko.com/en/api"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by CoinGecko API"
      className={cn("opacity-60 hover:opacity-100 transition", svgClassName)}
    >
      <Image
        src="/assets/poweredbyCGAPI.svg"
        alt="Powered by CoinGecko API"
        width={SIZES[size].w}
        height={SIZES[size].h}
      />
    </Link>
  )
}

export default PoweredByCGAPI