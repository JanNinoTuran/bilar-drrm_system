import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  AlertTriangle,
  Clock,
  Filter,
  MapPin,
  Thermometer,
  Waves,
  Wind,
} from "lucide-react";

interface MapFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  disasterTypes: string[];
  timeRange: number;
  severity: string;
  location: string;
  facilityTypes: string[];
  showEvacuationCenters: boolean;
  showHospitals: boolean;
  showRiskZones: boolean;
}

const defaultFilters: FilterState = {
  disasterTypes: ["Earthquake", "Flood"],
  timeRange: 24,
  severity: "all",
  location: "",
  facilityTypes: ["Evacuation Centers"],
  showEvacuationCenters: true,
  showHospitals: true,
  showRiskZones: true,
};

const MapFilters = ({ onFilterChange = () => {} }: MapFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const handleDisasterTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.disasterTypes, type]
      : filters.disasterTypes.filter((t) => t !== type);

    const updatedFilters = { ...filters, disasterTypes: updatedTypes };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleFacilityTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.facilityTypes, type]
      : filters.facilityTypes.filter((t) => t !== type);

    const updatedFilters = { ...filters, facilityTypes: updatedTypes };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSeverityChange = (value: string) => {
    const updatedFilters = { ...filters, severity: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleTimeRangeChange = (value: number[]) => {
    const updatedFilters = { ...filters, timeRange: value[0] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, location: e.target.value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleToggleChange = (key: keyof FilterState, value: boolean) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Card className="w-full h-full max-w-[300px] bg-white overflow-auto">
      <CardHeader className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-6">
          {/* Location Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </label>
            <Input
              placeholder="Search location"
              value={filters.location}
              onChange={handleLocationChange}
            />
          </div>

          {/* Disaster Types */}
          <Accordion type="single" collapsible defaultValue="disaster-types">
            <AccordionItem value="disaster-types">
              <AccordionTrigger className="py-2">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Disaster Types
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="earthquake"
                      checked={filters.disasterTypes.includes("Earthquake")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Earthquake", checked === true)
                      }
                    />
                    <label htmlFor="earthquake" className="text-sm">
                      Earthquake
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flood"
                      checked={filters.disasterTypes.includes("Flood")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Flood", checked === true)
                      }
                    />
                    <label htmlFor="flood" className="text-sm">
                      Flood
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="typhoon"
                      checked={filters.disasterTypes.includes("Typhoon")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Typhoon", checked === true)
                      }
                    />
                    <label htmlFor="typhoon" className="text-sm">
                      Typhoon
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fire"
                      checked={filters.disasterTypes.includes("Fire")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Fire", checked === true)
                      }
                    />
                    <label htmlFor="fire" className="text-sm">
                      Fire
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="landslide"
                      checked={filters.disasterTypes.includes("Landslide")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Landslide", checked === true)
                      }
                    />
                    <label htmlFor="landslide" className="text-sm">
                      Landslide
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tsunami"
                      checked={filters.disasterTypes.includes("Tsunami")}
                      onCheckedChange={(checked) =>
                        handleDisasterTypeChange("Tsunami", checked === true)
                      }
                    />
                    <label htmlFor="tsunami" className="text-sm">
                      Tsunami
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Time Range */}
          <Accordion type="single" collapsible defaultValue="time-range">
            <AccordionItem value="time-range">
              <AccordionTrigger className="py-2">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Range
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pl-2">
                  <div className="pt-2">
                    <Slider
                      defaultValue={[filters.timeRange]}
                      max={72}
                      step={12}
                      onValueChange={handleTimeRangeChange}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Last {filters.timeRange} hours</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Severity Level */}
          <Accordion type="single" collapsible defaultValue="severity">
            <AccordionItem value="severity">
              <AccordionTrigger className="py-2">
                <span className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Severity Level
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue={filters.severity}
                  onValueChange={handleSeverityChange}
                  className="pl-2"
                >
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="all" id="all" />
                    <label htmlFor="all" className="text-sm">
                      All Levels
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="high" id="high" />
                    <label htmlFor="high" className="text-sm">
                      High
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="medium" id="medium" />
                    <label htmlFor="medium" className="text-sm">
                      Medium
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value="low" id="low" />
                    <label htmlFor="low" className="text-sm">
                      Low
                    </label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Facility Types */}
          <Accordion type="single" collapsible defaultValue="facility-types">
            <AccordionItem value="facility-types">
              <AccordionTrigger className="py-2">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Facility Types
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pl-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="evacuation"
                      checked={filters.facilityTypes.includes(
                        "Evacuation Centers",
                      )}
                      onCheckedChange={(checked) =>
                        handleFacilityTypeChange(
                          "Evacuation Centers",
                          checked === true,
                        )
                      }
                    />
                    <label htmlFor="evacuation" className="text-sm">
                      Evacuation Centers
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hospitals"
                      checked={filters.facilityTypes.includes("Hospitals")}
                      onCheckedChange={(checked) =>
                        handleFacilityTypeChange("Hospitals", checked === true)
                      }
                    />
                    <label htmlFor="hospitals" className="text-sm">
                      Hospitals
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="police"
                      checked={filters.facilityTypes.includes(
                        "Police Stations",
                      )}
                      onCheckedChange={(checked) =>
                        handleFacilityTypeChange(
                          "Police Stations",
                          checked === true,
                        )
                      }
                    />
                    <label htmlFor="police" className="text-sm">
                      Police Stations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fire-stations"
                      checked={filters.facilityTypes.includes("Fire Stations")}
                      onCheckedChange={(checked) =>
                        handleFacilityTypeChange(
                          "Fire Stations",
                          checked === true,
                        )
                      }
                    />
                    <label htmlFor="fire-stations" className="text-sm">
                      Fire Stations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="relief-centers"
                      checked={filters.facilityTypes.includes("Relief Centers")}
                      onCheckedChange={(checked) =>
                        handleFacilityTypeChange(
                          "Relief Centers",
                          checked === true,
                        )
                      }
                    />
                    <label htmlFor="relief-centers" className="text-sm">
                      Relief Centers
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Map Layers */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Map Layers</h3>
            <div className="space-y-2 pl-2">
              <div className="flex items-center justify-between">
                <label htmlFor="evacuation-centers" className="text-sm">
                  Evacuation Centers
                </label>
                <Switch
                  id="evacuation-centers"
                  checked={filters.showEvacuationCenters}
                  onCheckedChange={(checked) =>
                    handleToggleChange("showEvacuationCenters", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="hospitals" className="text-sm">
                  Hospitals
                </label>
                <Switch
                  id="hospitals-layer"
                  checked={filters.showHospitals}
                  onCheckedChange={(checked) =>
                    handleToggleChange("showHospitals", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="risk-zones" className="text-sm">
                  Risk Zones
                </label>
                <Switch
                  id="risk-zones"
                  checked={filters.showRiskZones}
                  onCheckedChange={(checked) =>
                    handleToggleChange("showRiskZones", checked)
                  }
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapFilters;
