import type { FilterState } from "../../types";
import {
  TOKEN_COLORS,
  TOKEN_GROUP_LABELS,
  TOKEN_GROUPS,
} from "../../utils/constants";

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function Filters({ filters, onChange }: FiltersProps) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={filters.showGlobal}
            onChange={(e) =>
              onChange({ ...filters, showGlobal: e.target.checked })
            }
          />
          <span className="filter-badge global"></span>
          Global
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.showBrand}
            onChange={(e) =>
              onChange({ ...filters, showBrand: e.target.checked })
            }
          />
          <span className="filter-badge brand"></span>
          Brand
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.showSemantic}
            onChange={(e) =>
              onChange({ ...filters, showSemantic: e.target.checked })
            }
          />
          <span className="filter-badge semantic"></span>
          Semantic
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.showComponent}
            onChange={(e) =>
              onChange({ ...filters, showComponent: e.target.checked })
            }
          />
          <span className="filter-badge component"></span>
          Component
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.showOrphan}
            onChange={(e) =>
              onChange({ ...filters, showOrphan: e.target.checked })
            }
          />
          <span className="filter-badge orphan"></span>
          Orphan
        </label>
      </div>

      <div className="search-group">
        <input
          type="text"
          placeholder="Search tokens..."
          value={filters.searchTerm}
          onChange={(e) => onChange({ ...filters, searchTerm: e.target.value })}
          className="search-input"
        />
      </div>
    </div>
  );
}
