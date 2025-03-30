'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "shared/index";
import { Input } from "shared/ui/Input/Input";
import { useLocalStorage } from "shared/lib/hooks/useLocalStorage";


export default function RestClient() {
  const router = useRouter();
  const[method, setMethod] = useLocalStorage({
        key: 'method',
        defaultValue: 'GET'
      })
      const[link, setLink] = useLocalStorage({
        key: 'link',
        defaultValue: ''
      })


  const handleSubmit = (evt) => {
    evt.preventDefault()
    router.push(`/${method}?link=${encodeURIComponent(link)}`);
  };

  const handleMethodSelect = (evt) => {
    const {value} = evt.target
    setMethod(value)
    router.push(`/${value}?link=${encodeURIComponent(link)}`);
  }

  const handleLink = (evt) => {
    setLink(evt.target.value)
  }

  useEffect(() => {
    setMethod(method ?? 'GET')
    setLink(link ?? '')
  }, [method]);

  return (
    <form action="" onSubmit={handleSubmit}>
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">REST Client</h1>
      <Input
        id='1'
        type="url"
        placeholder="Введите ссылку"
        value={link}
        onChange={handleLink}
      />
      <select value={method} onChange={handleMethodSelect}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <Button type='submit' title={'Отправить'}/>
    </div>
    </form>
  );
}
