export const datePickerCustomStyles = `
/* Responsive DatePicker Styles */

.react-datepicker-popper {
  z-index: 50 !important;
}
.react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
  display: none;
}
.date-picker-popper::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 28px;
  width: 12px;
  height: 12px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  border-left: 1px solid #e5e7eb;
  transform: rotate(45deg);
  z-index: -1;
}

.react-datepicker {
  font-family: inherit;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .react-datepicker {
    font-size: 0.875rem;
    padding: 0.375rem;
  }
  
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    margin: 0.1rem;
  }
  
  .react-datepicker__current-month {
    font-size: 0.9rem;
  }
}

.react-datepicker__header {
  background-color: #fff;
  border-bottom: none;
  padding: 0.5rem 0;
}
.react-datepicker__current-month {
  font-weight: 600;
  font-size: 1rem;
  color: #1f2937;
}
.react-datepicker__navigation {
  top: 1rem !important;
}
.react-datepicker__navigation-icon::before {
  border-color: #9ca3af !important;
}
.react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
  border-color: #1f2937 !important;
}

.react-datepicker__day-name {
  color: #6b7280;
  font-weight: 500;
  font-size: 0.875rem;
  width: 2.25rem;
  height: 2.25rem;
  line-height: 2.25rem;
  text-align: center;
  margin: 0.125rem;
}

.react-datepicker__day {
  transition: background-color 0.2s, color 0.2s;
  border-radius: 0.5rem;
  width: 2.25rem;
  line-height: 2.25rem;
  margin: 0.125rem;
}

.react-datepicker__day--selected, 
.react-datepicker__day--in-range,
.react-datepicker__day--in-selecting-range {
  background-color: #F97316 !important;
  color: white !important;
  font-weight: bold;
}

.react-datepicker__day:hover {
  background-color: #F97316 !important;
  border-radius: 0.5rem !important;
}

.react-datepicker__day--range-start { border-radius: 0.5rem !important; }
.react-datepicker__day--range-end { border-radius: 0.5rem !important; }
.react-datepicker__day--in-range:not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end) {
  border-radius: 0.5rem !important;
}

.react-datepicker__day--today {
  font-weight: bold;
  background-color: #f0fdf4;
}
.react-datepicker__day--today.react-datepicker__day--selected {
  background-color: #EA580C !important;
}

.react-datepicker__day--outside-month {
  color: #d1d5db;
}

.react-datepicker__day--keyboard-selected {
  background-color: white;
}
`;