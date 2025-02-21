import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@headlessui/react"
import { toast } from "sonner"

export function RequestDataset() {
    function handleClick(){
        toast("We have received your request, Your dataset will be ready within 4-5 days");
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]">Request New Dataset</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md text-white backdrop-blur-xl bg-[#FFFFFF]/5 border-[#d1d1e0]/10 shadow-lg">
                <DialogHeader>
                    <DialogTitle>Request New Dataset</DialogTitle>
                    <DialogDescription className="text-white">
                        Watch Relevent People, Hashtags, and your topic of interest on Twitter to create dataset for your agency...
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="@NarendraModi"
                            className="col-span-3 bg-gray-700 text-white  border-[#d1d1e0]/10"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="hashtags" className="text-right">
                            Trending Hashtags
                        </Label>
                        <Input
                            id="hashtags"
                            placeholder="#Elections #Votetowin #BJP"
                            className="col-span-3 bg-gray-700 text-white  border-[#d1d1e0]/10"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-4">
                        <Label htmlFor="other" className="text-right">
                            Other Info
                        </Label>
                        <Textarea
                            id="other"
                            placeholder="Please provide any additional information we should extract from Tweets to create a more relevant dataset for your agency."
                            className="col-span-3 bg-gray-700 text-white w-full p-4 rounded-lg border  border-[#d1d1e0]/10"
                            rows={3}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button onClick={handleClick} type="button" className="rounded-md bg-gradient-to-r from-[#d93678] to-[#e94c8e] px-6 py-2 font-bold text-white transition-all duration-300 hover:from-[#b92e66] hover:to-[#d63f7c] active:from-[#a02858] active:to-[#bf356b]" variant="secondary">
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
