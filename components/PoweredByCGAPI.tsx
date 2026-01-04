import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const PoweredByCGAPI = ({ svgClassName, size = "md" }: PoweredByCGAPIProps) => {
  const sizes = {
    sm: { w: 140, h: 46 },
    md: { w: 180, h: 58 },
    lg: { w: 220, h: 72 },
    xl: { w: 260, h: 86 },
    xxl: { w: 300, h: 100 },
  };

  return (
    <Link
      href="https://www.coingecko.com/en/api"
      target="_blank"
      rel="noreferrer"
      className={cn("opacity-60 hover:opacity-100 transition", svgClassName)}
    >
      <Image
        src="/assets/poweredbyCGAPI.svg"
        alt="Powered by CoinGecko API"
        width={sizes[size].w}
        height={sizes[size].h}
      />
    </Link>
  )
}

export default PoweredByCGAPI