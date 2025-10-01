"use client";

import { useEffect, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { getGlobalSearch } from "../../Store/Actions/notificationsActions";
import { useDispatch } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import IconInputCommon from "./IconInputCommon";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_CONSTANTS } from "../../Utils/Constants";
import {
  User,
  FileText,
  Users,
  Folder,
  Banknote,
  Briefcase,
  BookUser,
  Contact,
  ShieldCheck,
} from "lucide-react";
export default function GlobalSearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dispatch = useDispatch();
  const [globalSearch, setGlobalSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const sectionIcons = {
    users: User,
    clients: Briefcase,
    documents: FileText,
    "bank accounts": Banknote,
    "category groups": Folder,
    accountants: BookUser,
    invitations: Contact,
    teams: Users,
  };

  // Debounce input
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 500);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleNavigation = (data) => {
    const params = new URLSearchParams();
    params.set(
      LOCAL_STORAGE_CONSTANTS.NAVIGATION_STATE,
      encodeURIComponent(JSON.stringify(data))
    );

    console.log('data?.url?.contains("where")', data?.url?.includes("where"));
    if (data?.url?.includes("where")) navigate(`${data?.url}&${params}`);
    else navigate(`${data?.url}?${params}`);
    setIsSearchActive(false);
  };

  // API call when debouncedSearch changes
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setGlobalSearch([]);
      setIsLoading(false);
      return;
    }

    const fetchGlobalSearch = async () => {
      setIsLoading(true);
      try {
        const resp = await dispatch(getGlobalSearch(debouncedSearch)).unwrap();
        setGlobalSearch(resp?.data || []);
      } catch (err) {
        console.error("Search error:", err);
        setGlobalSearch([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobalSearch();
  }, [debouncedSearch, isSearchActive, dispatch]);

  const hasResults = globalSearch.length > 0;
  const showDropdown = isSearchActive && searchInput.trim();

  return (
    <div className="w-full max-w-md">
      <IconInputCommon
        type="text"
        placeholder="Search"
        id="search"
        Icon={Search}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onBlur={() => {
          // Delay hiding to allow click events on results
          setTimeout(() => setIsSearchActive(false), 150);
        }}
        onFocus={() => setIsSearchActive(true)}
      />

      <div className="relative">
        {showDropdown && (
          <div className="absolute top-0 left-0 bg-white max-h-[300px] overflow-y-auto z-10 w-full rounded-md shadow-lg border p-2">
            {isLoading ? (
              // Loading state
              <div className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ) : hasResults ? (
              // Results found
              globalSearch.map((item, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <h1 className="text-[10px] text-gray-400 uppercase tracking-wider font-medium pt-1 pb-1">
                    {item?.section || "N/A"}
                  </h1>
                  <div className="space-y-1">
                    {item?.data?.map((sear, searIndex) => {
                      const sectionKey = item?.section?.toLowerCase();
                      const Icon = sectionIcons[sectionKey];

                      return (
                        <p
                          key={searIndex}
                          className="cursor-pointer flex items-center gap-2 rounded-md bg-[#F766590D] px-4 py-3 text-xs transition-all duration-150 border border-transparent hover:shadow-sm"
                          onClick={() => handleNavigation(sear)}
                        >
                          {/* Icon */}
                          <span className="text-gray-500">
                            {Icon ? <Icon size={14} /> : <FileText size={6} />}
                          </span>

                          {/* Name */}
                          <span className="flex flex-col text-start">
                            <span className="text-xs font-medium">
                              {sear?.heading || "Unnamed"}
                            </span>
                            <span className="text-[10px] text-gray-500 leading-tight">
                              {sear?.sub_heading || ""}
                            </span>
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              // No results found
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <SearchX className="h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No results found
                </h3>
                <p className="text-xs text-gray-500">
                  Try adjusting your search terms or check for typos
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
