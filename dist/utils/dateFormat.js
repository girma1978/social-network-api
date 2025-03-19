"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
// Function to format a timestamp
const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const formattedMonth = dateObj.getMonth() + 1;
    const dayOfMonth = dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    // Convert to 12-hour time format with AM/PM
    const periodOfDay = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 to 12
    const formattedTimeStamp = `${formattedMonth}/${dayOfMonth}/${year} at ${hour}:${minutes} ${periodOfDay}`;
    return formattedTimeStamp;
};
exports.formatDate = formatDate;
