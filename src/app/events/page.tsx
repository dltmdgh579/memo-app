"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import {
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [filterValue, setFilterValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 임시 데이터
  const events = [
    {
      id: 1,
      title: "청년부 여름 수련회",
      date: "2024-07-15",
      location: "양평 수련원",
      attendees: 45,
      totalExpense: 1500000,
      status: "upcoming",
    },
    {
      id: 2,
      title: "부활절 특별 예배",
      date: "2024-03-31",
      location: "본당",
      attendees: 60,
      totalExpense: 800000,
      status: "completed",
    },
  ];

  const statusColorMap = {
    upcoming: "primary",
    completed: "success",
    cancelled: "danger",
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">행사 기록</h1>
          <Button
            color="primary"
            startContent={<Plus size={20} />}
            onPress={onOpen}
          >
            새 행사 추가
          </Button>
        </div>

        {/* 필터 및 검색 섹션 */}
        <div className="flex gap-4 items-center">
          <Input
            className="w-full max-w-md"
            placeholder="행사명으로 검색..."
            startContent={<Search size={18} />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" startContent={<Filter size={18} />}>
                {filterValue === "all" ? "모든 상태" : filterValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="상태 필터"
              onAction={(key) => setFilterValue(key as string)}
            >
              <DropdownItem key="all">모든 상태</DropdownItem>
              <DropdownItem key="upcoming">예정된 행사</DropdownItem>
              <DropdownItem key="completed">완료된 행사</DropdownItem>
              <DropdownItem key="cancelled">취소된 행사</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* 행사 목록 테이블 */}
        <Table aria-label="행사 목록">
          <TableHeader>
            <TableColumn>행사명</TableColumn>
            <TableColumn>날짜</TableColumn>
            <TableColumn>장소</TableColumn>
            <TableColumn>참석인원</TableColumn>
            <TableColumn>지출금액</TableColumn>
            <TableColumn>상태</TableColumn>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-primary hover:underline"
                  >
                    {event.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    {event.attendees}명
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    {event.totalExpense.toLocaleString()}원
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    className="capitalize"
                    color={
                      statusColorMap[
                        event.status as keyof typeof statusColorMap
                      ]
                    }
                    size="sm"
                    variant="flat"
                  >
                    {event.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 새 행사 추가 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              새 행사 등록
            </ModalHeader>
            <ModalBody>
              <Input
                label="행사명"
                placeholder="행사명을 입력하세요"
                variant="bordered"
              />
              <Input
                label="날짜"
                type="date"
                placeholder="날짜를 선택하세요"
                variant="bordered"
              />
              <Input
                label="장소"
                placeholder="장소를 입력하세요"
                variant="bordered"
              />
              <Input
                label="예상 참석 인원"
                type="number"
                placeholder="예상 인원을 입력하세요"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                취소
              </Button>
              <Button color="primary" onPress={onClose}>
                등록
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
