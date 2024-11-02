"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button, Link } from "@nextui-org/react";
import { CalendarIcon } from "lucide-react";
import { Users } from "lucide-react";
import { ClipboardList } from "lucide-react";

export default function Home() {
  const menuItems = [
    {
      title: "행사 기록",
      description: "교회 행사 내용과 구매 물품을 기록하고 관리하세요",
      icon: <ClipboardList size={24} />,
      href: "/events",
      color: "primary",
    },
    {
      title: "출석체크",
      description: "청년부 멤버들의 출석을 관리하세요",
      icon: <Users size={24} />,
      href: "/attendance",
      color: "success",
    },
    {
      title: "일정관리",
      description: "교회 행사와 모임 일정을 확인하세요",
      icon: <CalendarIcon size={24} />,
      href: "/calendar",
      color: "warning",
    },
  ];

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* 환영 메시지 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">청년부 관리 시스템</h1>
          <p className="text-lg text-gray-600">
            교회 청년부 행사와 출석을 효율적으로 관리하세요
          </p>
        </div>

        {/* 메뉴 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-transform duration-200"
              isPressable
              as={Link}
              href={item.href}
            >
              <CardHeader className="flex gap-3 px-6 pt-6">
                <div className={`p-2 rounded-lg bg-${item.color}/10`}>
                  {item.icon}
                </div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </CardHeader>
              <CardBody className="px-6 py-4">
                <p className="text-gray-600">{item.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* 최근 활동 섹션 */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">최근 활동</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {/* 여기에 최근 활동 목록을 추가할 수 있습니다 */}
                <p className="text-gray-600">아직 기록된 활동이 없습니다.</p>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 flex justify-center gap-4">
          <Button
            color="primary"
            variant="solid"
            size="lg"
            href="/events/new"
            as={Link}
          >
            새 행사 기록
          </Button>
          <Button
            color="success"
            variant="solid"
            size="lg"
            href="/attendance/new"
            as={Link}
          >
            출석체크 시작
          </Button>
        </section>
      </div>
    </main>
  );
}
