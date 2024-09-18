import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export function getTimeIn12HourFormate(dateTimeString: string): string {
  const date: Date = new Date(dateTimeString);
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";
  const formattedHours: number = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectFieldChip({
  schedules,
  selectSchedulIds,
  setSelectScheduleIds,
}: any) {
  const theme = useTheme();
  // const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectSchedulIds>) => {
    const {
      target: { value },
    } = event;
    setSelectScheduleIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectSchedulIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => {
                  const selectedSchedule = schedules.find(
                    (schedule: any) => schedule.id === value
                  );
                  if (!selectedSchedule) return null;
                  const formatedTimeSlot = `${getTimeIn12HourFormate(
                    selectedSchedule.startDate
                  )}-${getTimeIn12HourFormate(selectedSchedule.endDate)}`;
                  return <Chip key={value} label={formatedTimeSlot} />;
                })}
              </Box>
            );
          }}
          MenuProps={MenuProps}
        >
          {schedules.map((schedule: any) => (
            <MenuItem
              key={schedule.id}
              value={schedule.id}
              style={getStyles(schedule.id, selectSchedulIds, theme)}
            >
              {`${getTimeIn12HourFormate(
                schedule.startDate
              )}-${getTimeIn12HourFormate(schedule.endDate)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
