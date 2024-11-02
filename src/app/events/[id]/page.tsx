"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Input,
  Textarea,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Divider,
} from "@nextui-org/react";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function EventDetailPage() {
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState("details");

  // 임시 데이터
  const event = {
    id: 1,
    title: "청년부 여름 수련회",
    date: "2024-07-15",
    description: "2024년 청년부 여름 수련회입니다.",
    location: "양평 수련원",
    attendees: 45,
    totalExpense: 1500000,
    status: "upcoming",
    expenses: [
      { id: 1, item: "숙박비", amount: 800000, category: "숙박" },
      { id: 2, item: "식비", amount: 450000, category: "식사" },
      { id: 3, item: "간식", amount: 250000, category: "기타" },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="bordered"
              startContent={<Edit size={20} />}
            >
              수정
            </Button>
            <Button
              color="danger"
              variant="bordered"
              startContent={<Trash size={20} />}
            >
              삭제
            </Button>
          </div>
        </div>

        {/* 탭 섹션 */}
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab as any}
        >
          <Tab key="details" title="상세 정보">
            <Card>
              <CardBody className="gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} />
                    <div>
                      <div className="text-sm text-gray-500">날짜</div>
                      <div>{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <div>
                      <div className="text-sm text-gray-500">장소</div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <div>
                      <div className="text-sm text-gray-500">참석 인원</div>
                      <div>{event.attendees}명</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} />
                    <div>
                      <div className="text-sm text-gray-500">총 지출</div>
                      <div>{event.totalExpense.toLocaleString()}원</div>
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <h3 className="text-lg font-semibold mb-2">행사 설명</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </CardBody>
            </Card>
          </Tab>

          <Tab key="expenses" title="지출 내역">
            <Card>
              <CardHeader className="flex justify-between">
                <h3 className="text-lg font-semibold">지출 목록</h3>
                <Button
                  color="primary"
                  size="sm"
                  startContent={<Plus size={18} />}
                >
                  지출 추가
                </Button>
              </CardHeader>
              <CardBody>
                <Table aria-label="지출 목록">
                  <TableHeader>
                    <TableColumn>항목</TableColumn>
                    <TableColumn>카테고리</TableColumn>
                    <TableColumn>금액</TableColumn>
                    <TableColumn>작업</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {event.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.item}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>
                          {expense.amount.toLocaleString()}원
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="bordered" isIconOnly>
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              color="danger"
                              variant="bordered"
                              isIconOnly
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
