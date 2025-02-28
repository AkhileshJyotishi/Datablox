"use client";

import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { X, Plus, Hash, FileText, Send, Database } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function RequestDataset() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");

  const addKeyword = () => {
    if (keywordInput.trim() !== "" && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const addHashtag = () => {
    const formatted = hashtagInput.trim().startsWith("#") ? hashtagInput.trim() : `#${hashtagInput.trim()}`;

    if (hashtagInput.trim() !== "" && !hashtags.includes(formatted)) {
      setHashtags([...hashtags, formatted]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (hashtag: string) => {
    setHashtags(hashtags.filter((h) => h !== hashtag));
  };

  const handleSubmit = () => {
    // Validate form
    if (keywords.length === 0) {
      toast.error("Please add at least one keyword");
      return;
    }
    if (hashtags.length === 0) {
      toast.error("Please add at least one hashtag");
      return;
    }
    if (description.trim().length < 10) {
      toast.error("Please provide a more detailed description (at least 10 characters)");
      return;
    }

    // Process the data
    const requestData = {
      keywords,
      hashtags,
      description,
    };

    console.log("Request data:", requestData);

    // Show success message
    toast.success("We have received your request. Your dataset will be ready within 4-5 days");

    // Reset form
    setKeywords([]);
    setHashtags([]);
    setDescription("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: "keyword" | "hashtag") => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type === "keyword") {
        addKeyword();
      } else {
        addHashtag();
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"default"} className="bg-purple-600 hover:bg-purple-500 text-white">
          <Database className="h-4 w-4 " />
          Request Dataset
        </Button>
      </SheetTrigger>
      <div className="">
        <SheetContent
          side="bottom"
          className="max-w-7xl   mx-auto rounded-t-xl bg-black text-white border-t border-l border-r  border-gray-500 "
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-lg font-bold">Request Custom Dataset</SheetTitle>
            <SheetDescription className="text-sm text-zinc-400">
              Fill in the details below to request a custom dataset. We'll prepare it for you within 4-5 days.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            {/* Keywords */}
            <div className="space-y-2">
              <Label htmlFor="keywords" className="flex items-center gap-2 text-white">
                <FileText className="h-4 w-4" />
                Keywords
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {keywords.map((keyword) => (
                  <div
                    key={keyword}
                    className="flex items-center gap-1 bg-zinc-950 text-white px-2 py-1 rounded-md border border-zinc-700"
                  >
                    <span>{keyword}</span>
                    <button type="button" onClick={() => removeKeyword(keyword)} className="text-zinc-400 hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="keywords"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, "keyword")}
                  placeholder="Add keywords (press Enter)"
                  className="flex-1 bg-zinc-950 text-white  placeholder-zinc-500  "
                />
                <Button type="button" size="icon" onClick={addKeyword} disabled={keywordInput.trim() === ""} className="bg-zinc-700 text-white hover:bg-zinc-600">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Hashtags */}
            <div className="space-y-2">
              <Label htmlFor="hashtags" className="flex items-center gap-2 text-white">
                <Hash className="h-4 w-4" />
                Twitter Hashtags
              </Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {hashtags.map((hashtag) => (
                  <div key={hashtag} className="flex items-center gap-1 bg-zinc-950 text-white px-2 py-1 rounded-md border border-zinc-700">
                    <span>{hashtag}</span>
                    <button type="button" onClick={() => removeHashtag(hashtag)} className="text-zinc-400 hover:text-red-400">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="hashtags"
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, "hashtag")}
                  placeholder="Add hashtags (press Enter)"
                  className="flex-1 bg-zinc-950 text-white border border-zinc-700 placeholder-zinc-500"
                />
                <Button type="button" size="icon" onClick={addHashtag} disabled={hashtagInput.trim() === ""} className="bg-zinc-700 text-white hover:bg-zinc-600">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2 text-white">
                <FileText className="h-4 w-4" />
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your dataset request..."
                className="min-h-[100px] bg-zinc-950 text-white border border-zinc-700 placeholder-zinc-500"
              />
            </div>
          </div>

          <SheetFooter className="mt-6 flex gap-2 sm:justify-end">
            <SheetClose asChild>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-950">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-500 text-white">
              <Send className="h-4 w-4 " />
              Request Dataset
            </Button>
          </SheetFooter>
        </SheetContent>

      </div>
    </Sheet>
  );
}
