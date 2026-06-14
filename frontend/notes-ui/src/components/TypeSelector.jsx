import { NOTE_TYPES } from "../constants/noteTypes";

function TypeSelector({ selectedType, setSelectedType }) {
  return (
    <div>
      <h4 className="type-title">Select Note Type</h4>

      <div className="type-grid">
        {NOTE_TYPES.map((type) => {
          const Icon = type.icon;

          return (
            <div
              key={type.value}
              className={`type-card ${
                selectedType === type.value ? "active-type" : ""
              }`}
              style={{
                borderColor: type.color,
              }}
              onClick={() => setSelectedType(type.value)}
            >
              <Icon size={18} color={type.color} />

              <span>{type.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TypeSelector;
