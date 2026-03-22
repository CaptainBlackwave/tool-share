'use client';

import { useState, useCallback } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { addDays, startOfDay, isBefore } from 'date-fns';
import 'react-day-picker/style.css';

interface CalendarProps {
  blockedDates?: Array<{ start: Date; end: Date }>;
  onSelect?: (range: DateRange | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function Calendar({
  blockedDates = [],
  onSelect,
  minDate,
  maxDate,
}: CalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  const getDisabledDays = useCallback(() => {
    const disabled: Date[] = [];
    
    for (const block of blockedDates) {
      let current = startOfDay(block.start);
      const end = startOfDay(block.end);
      
      while (!isBefore(addDays(current, 1), end) && current <= end) {
        disabled.push(new Date(current));
        current = addDays(current, 1);
      }
    }

    return disabled;
  }, [blockedDates]);

  const disabled = [
    ...getDisabledDays(),
    { before: minDate || new Date() },
    ...(maxDate ? [{ after: maxDate }] : []),
  ] as any;

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);
    onSelect?.(selected);
  };

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={handleSelect}
      disabled={disabled}
      numberOfMonths={2}
    />
  );
}

interface PriceCalculatorProps {
  pricePerDay: number;
  deposit: number;
  dateRange?: DateRange;
}

export function PriceCalculator({ pricePerDay, deposit, dateRange }: PriceCalculatorProps) {
  if (!dateRange?.from || !dateRange?.to) {
    return null;
  }

  const days = Math.ceil(
    (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  const subtotal = days * pricePerDay;
  const platformFee = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + platformFee;
  const totalWithDeposit = total + deposit;

  return (
    <div className="bg-[#f0ede8] rounded-lg p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#6b6b6b]">
          ${pricePerDay} × {days} day{days > 1 ? 's' : ''}
        </span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[#6b6b6b]">Platform fee (5%)</span>
        <span>${platformFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[#6b6b6b]">Security deposit (refundable)</span>
        <span>${deposit.toFixed(2)}</span>
      </div>
      <div className="border-t border-[#d4d0c8] pt-2 mt-2">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span className="price text-[#e85d04]">${totalWithDeposit.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export type { DateRange };
