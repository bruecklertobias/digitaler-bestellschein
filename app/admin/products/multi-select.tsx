"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

type MultiSelectProps = {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-brand text-brand min-h-[2.5rem] h-auto"
        >
          <div className="flex flex-wrap gap-1 items-center">
            {selected.length > 0 ? (
              selected.map((item) => (
                <Badge key={item} variant="secondary" className="mr-1 mb-1">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="max-h-[300px] overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
          <CommandInput placeholder="Suchen..." className="sticky top-0 z-10 bg-white" />
          <CommandList>
            <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option} onSelect={() => handleSelect(option)}>
                  <Check className={cn("mr-2 h-4 w-4", selected.includes(option) ? "opacity-100" : "opacity-0")} />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

