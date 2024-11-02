"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const SCHEDULE_TYPES = [
  { value: "event", label: "행사", color: "primary" },
  { value: "meeting", label: "모임", color: "success" },
  { value: "worship", label: "예배", color: "warning" },
  { value: "other", label: "기타", color: "default" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 임시 일정 데이터
  const schedules = [
    {
      id: 1,
      title: "청년부 예배",
      start: "2024-03-03T11:00:00",
      end: "2024-03-03T12:30:00",
      type: "worship",
    },
    {
      id: 2,
      title: "임원 회의",
      start: "2024-03-10T14:00:00",
      end: "2024-03-10T16:00:00",
      type: "meeting",
    },
  ];

  // 달력 관련 유틸리티 함수들
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    // 이전 달의 날짜들
    for (let i = 0; i < startingDay; i++) {
      const prevMonth = new Date(year, month, 0);
      days.push({
        date: new Date(
          year,
          month - 1,
          prevMonth.getDate() - startingDay + i + 1,
        ),
        isCurrentMonth: false,
      });
    }

    // 현재 달의 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 다음 달의 날짜들
    const remainingDays = 42 - days.length; // 6주 달력을 위해
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const getSchedulesForDate = (date: Date) => {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start);
      return (
        scheduleDate.getDate() === date.getDate() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1,
      ),
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">일정관리</h1>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                variant="light"
                onPress={() => navigateMonth("prev")}
              >
                <ChevronLeft />
              </Button>
              <span className="text-xl font-semibold">
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </span>
              <Button
                isIconOnly
                variant="light"
                onPress={() => navigateMonth("next")}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
          <Button color="primary" startContent={<Plus />} onPress={onOpen}>
            일정 추가
          </Button>
        </div>

        {/* 캘린더 그리드 */}
        <Card>
          <CardBody className="p-0">
            <div className="grid grid-cols-7 border-b">
              {DAYS_OF_WEEK.map((day, index) => (
                <div
                  key={day}
                  className={`py-2 text-center font-semibold 
                    ${index === 0 ? "text-red-500" : ""} 
                    ${index === 6 ? "text-blue-500" : ""}`}
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {getDaysInMonth(currentDate).map(
                ({ date, isCurrentMonth }, index) => {
                  const scheduleItems = getSchedulesForDate(date);
                  const isToday =
                    new Date().toDateString() === date.toDateString();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border-b border-r 
                      ${!isCurrentMonth ? "bg-gray-50" : ""}
                      hover:bg-gray-50 cursor-pointer
                    `}
                      onClick={() => {
                        setSelectedDate(date);
                        onOpen();
                      }}
                    >
                      <div
                        className={`
                      flex justify-center items-center w-6 h-6 rounded-full mb-1
                      ${isToday ? "bg-primary text-white" : ""}
                      ${date.getDay() === 0 ? "text-red-500" : ""}
                      ${date.getDay() === 6 ? "text-blue-500" : ""}
                    `}
                      >
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {scheduleItems.map((schedule) => (
                          <div
                            key={schedule.id}
                            className={`text-xs p-1 rounded truncate
                            bg-${
                              SCHEDULE_TYPES.find(
                                (t) => t.value === schedule.type,
                              )?.color
                            }-100
                            text-${
                              SCHEDULE_TYPES.find(
                                (t) => t.value === schedule.type,
                              )?.color
                            }-700
                          `}
                          >
                            {schedule.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </CardBody>
        </Card>

        {/* 일정 추가/수정 모달 */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {selectedDate
                ? `${
                    selectedDate.getMonth() + 1
                  }월 ${selectedDate.getDate()}일 `
                : ""}
              일정 추가
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="일정 제목"
                  placeholder="일정 제목을 입력하세요"
                  variant="bordered"
                />
                <div className="flex gap-4">
                  <Input
                    type="datetime-local"
                    label="시작 시간"
                    placeholder="시작 시간을 선택하세요"
                    variant="bordered"
                  />
                  <Input
                    type="datetime-local"
                    label="종료 시간"
                    placeholder="종료 시간을 선택하세요"
                    variant="bordered"
                  />
                </div>
                <Select
                  label="일정 유형"
                  placeholder="일정 유형을 선택하세요"
                  variant="bordered"
                >
                  {SCHEDULE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="장소"
                  placeholder="장소를 입력하세요"
                  variant="bordered"
                />
                <Textarea
                  label="설명"
                  placeholder="일정에 대한 설명을 입력하세요"
                  variant="bordered"
                />
                <Checkbox defaultSelected>하루 종일</Checkbox>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                취소
              </Button>
              <Button color="primary" onPress={onClose}>
                저장
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
