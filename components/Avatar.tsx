import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

type Props = {
  seed?: string;
  large?: boolean;
};

const Avatar: FC<Props> = ({ seed, large }) => {
  const { data: session } = useSession();

  return (
    <div
      className={`relative h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          session?.user?.name || "placeholder"
        }.svg`}
      />
    </div>
  );
};

export default Avatar;
