import { FixedSizeList as List } from "react-window";
import { SelectItem } from "../ui/select";

export const VirtualizedDropdown = ({ data = [], onSelect }) => {
  const itemHeight = 35; // Adjust based on your design
  const height = Math.min(data.length * itemHeight, 300); // Limit max height

  const Row = ({ index, style }) => {
    const country = data[index];
    return (
      <SelectItem
        style={style}
        key={country.id}
        value={country.id}
        className="cursor-pointer px-3 py-1 hover:bg-gray-100"
      >
        ({country?.name?.slice(0, 2)?.toLocaleUpperCase()}) - {country.name}
      </SelectItem>
    );
  };

  return (
    <List
      height={height}
      itemCount={data.length}
      itemSize={itemHeight}
      width="20rem"
      // initialScrollOffset={selectedIndex * itemHeight}
    >
      {Row}
    </List>
  );
};
