import { type FC } from "react";
import { type Editor } from "@tiptap/react";
import UiIcon from "@/components/ui/UiIcon/UiIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IconPickerProps {
  editor: Editor;
}

// TODO: move const
const ICONS = [
  {
    name: "code",
    svg:
      '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
      '  <path d="M12.8 20L8.8 16L12.8 12M19.2 12L23.2 16L19.2 20M6.4 28.8C4.63 28.8 3.2 27.37 3.2 25.6V6.4C3.2 4.63 4.63 3.2 6.4 3.2H25.6C27.37 3.2 28.8 4.63 28.8 6.4V25.6C28.8 27.37 27.37 28.8 25.6 28.8H6.4Z" \n' +
      '    stroke="currentColor" \n' +
      '    stroke-width="2" \n' +
      '    stroke-linecap="round" \n' +
      '    stroke-linejoin="round"/>\n' +
      "</svg>",
  },
  {
    name: "location",
    svg: '<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 3C21.3848 3 26 7.61522 26 13C26 18.3848 16 29 16 29C16 29 6 18.3848 6 13C6 7.61522 10.6152 3 16 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="11" y="8" width="10" height="10" rx="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    name: "mail",
    svg: '<svg  viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 11L16 17L24 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    name: "phone",
    svg: '<svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.24052 1.94595L5.46795 1.70047C6.3208 1.5299 7.18612 1.93005 7.6085 2.69034L9.7024 6.45936C10.1361 7.23995 9.99972 8.21344 9.3683 8.84486L7.95861 10.2545C7.3098 10.9041 7.1866 11.9121 7.66042 12.6985C8.45558 14.0205 9.3812 15.2096 10.4373 16.2656C11.4934 17.3217 12.6816 18.2465 14.002 19.04C14.7885 19.5117 15.795 19.388 16.4439 18.7398L17.8536 17.3301C18.485 16.6987 19.4585 16.5624 20.2391 16.996L24.0081 19.0899C24.7684 19.5123 25.1685 20.3776 24.998 21.2305L24.7525 22.4579C24.6351 23.0441 24.2618 23.5471 23.7337 23.8274C18.7799 26.468 13.4042 24.8894 7.60661 19.0918C1.80901 13.2942 0.230472 7.91852 2.87101 2.96472C3.15133 2.43668 3.65432 2.06329 4.24052 1.94595Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    name: "world",
    svg: '<svg viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16.8823" r="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="16" cy="16.8823" rx="6" ry="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 21.8824L5 21.8824" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M27 11.8823L5 11.8823" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  },
];

const IconPicker: FC<IconPickerProps> = ({ editor }) => {
  const insertIcon = ({ name, svg }: { name: string; svg: string }) => {
    editor.commands.insertContent({
      type: "icon",
      attrs: {
        name,
        svg,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <UiIcon name="swatches" />
      </PopoverTrigger>
      <PopoverContent>
        {ICONS.map((icon, index) => (
          <button
            key={index}
            onClick={() => insertIcon({ name: icon.name, svg: icon.svg })}
            className="w-10 rounded-md p-2 transition-colors duration-150 ease-in-out hover:bg-gray-100"
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
