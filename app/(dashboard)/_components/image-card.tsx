import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ImageCard = ({ image }: { image: string }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = image.substring(image.lastIndexOf("/") + 1);
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-[330px]">
      <CardContent className="p-2">
        <AspectRatio ratio={10 / 10}>
          <Image
            src={image}
            alt="Image"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="p-1">
        <Button
          onClick={handleDownload}
          variant={"secondary"}
          className="h-10 w-full font-semibold text-md"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
