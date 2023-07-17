"use client";

import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import SearchButton from "./SearchButton";
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SORT_BY_MAP = {
  r: "Default",
  rv: "By Review",
  p: "By Price (low to high)",
  pd: "By Price (high to low)",
};

function Header() {
  const [pages, setPages] = useState("");
  const [sortBy, setSortBy] = useState("r");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  return (
    <header className="flex flex-col items-center px-2 pt-10 pb-6 md:flex-row md:items-start md:space-x-6 md:p-10 md:pb-5">
      <Link href="/">
        <Image
          src="https://links.papareact.com/208"
          alt="Logo"
          width={150}
          height={150}
          className="object-contain mr-10"
        />
      </Link>

      <div className="w-full md:max-w-2xl">
        <form
          action={(formData) => {
            const searchTerm = formData.get("searchTerm");

            if (!formData.get("searchTerm")) return;

            const params = new URLSearchParams();

            if (pages) params.set("pages", pages.toString());
            if (sortBy) params.set("sort_by", sortBy.toString());
            if (minPrice) params.set("min_price", minPrice.toString());
            if (maxPrice) params.set("max_price", maxPrice.toString());

            router.push(`/search/${searchTerm}?${params.toString()}`);
          }}
        >
          <div className="flex items-center w-full gap-2 px-4">
            <div className="flex items-center flex-1 px-6 py-4 space-x-2 bg-white border-0 rounded-full shadow-xl">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                name="searchTerm"
                className="flex-1 outline-none"
              />
            </div>

            <SearchButton />
          </div>

          <div className="grid items-center max-w-lg grid-cols-2 gap-2 p-4 mx-auto md:grid-cols-4 md:max-w-none">
            <SearchSelect
              className="min-w-4"
              placeholder="# of pages"
              onValueChange={(value) => setPages(value)}
            >
              {[...Array(100)].map((_, i) => (
                <SearchSelectItem key={i} value={(i + 1).toString()}>
                  {(i + 1).toString()} pages
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <Select
              className="min-w-4"
              placeholder="Sort"
              onValueChange={(value) => setSortBy(value)}
            >
              {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </Select>

            <SearchSelect
              className="min-w-4"
              placeholder="Min Price..."
              onValueChange={(value) => setMinPrice(value)}
            >
              {["", "100", "250", "500", "750", "900", "1000"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Minimum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <SearchSelect
              className="min-w-4"
              placeholder="Max Price..."
              onValueChange={(value) => setMaxPrice(value)}
            >
              {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Maximum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
        </form>
      </div>

      <div className="justify-end flex-1 hidden lg:flex">
        <Avatar name="Andrew Mills" round size="50" />
      </div>
    </header>
  );
}

export default Header;
