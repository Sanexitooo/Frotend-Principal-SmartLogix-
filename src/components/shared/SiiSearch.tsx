import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { codigosSII } from "@/data/sii-codes";
import type { SiiCode } from "@/types";

interface SiiSearchProps {
  value: string;
  onSelect: (item: SiiCode) => void;
}

const SiiSearch = ({ value, onSelect }: SiiSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = codigosSII
    .filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.includes(searchTerm)
    )
    .slice(0, 6);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar Código SII..."
          className="w-full bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-saas-orange/20 pr-10 text-sm text-slate-900 placeholder:text-slate-400 font-medium"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
        />
        <Search className="absolute right-4 top-4 text-slate-900" size={18} />
      </div>
      <AnimatePresence>
        {showDropdown && searchTerm.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-[210] w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="max-h-48 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item.codigo}
                    type="button"
                    className="w-full text-left p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
                    onClick={() => {
                      onSelect(item);
                      setSearchTerm(`${item.codigo} - ${item.nombre}`);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="font-bold text-saas-orange text-xs">{item.codigo}</span>
                    <p className="text-[10px] text-saas-teal font-medium truncate uppercase">{item.nombre}</p>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-slate-400 text-center">Sin resultados</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiiSearch;
