interface Props {
  items: string[];
  value: string;
  onChange: (currency: string) => void;
}

function CurrencySelector({ items, value, onChange }: Props) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    onChange(event.target.value);
  };

  return (
    <select onChange={handleSelectChange} value={value}>
      {items.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}

export default CurrencySelector;
