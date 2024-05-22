export type GuestProps = {
  name: String;
  onRemove: () => void;
  checkedGuests: String[];
  onCheck: () => void;
};
