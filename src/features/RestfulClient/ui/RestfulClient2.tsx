'use client';
//@ts-nocheck
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "shared/lib/hooks/useLocalStorage";

// Стили
const inputStyle = {
  flex: 1,
  padding: 10,
  marginRight: 5,
  border: '1px solid #ccc',
  borderRadius: 5,
};

const buttonStyle = {
  padding: 10,
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  marginLeft: 5,
};

const responseStyle = {
  background: '#f4f4f4',
  padding: 10,
  marginTop: 10,
  borderRadius: 5,
  overflowX: 'auto',
};


const RestfulClient = () => {
   const router = useRouter();
    const[method, setMethod] = useLocalStorage({
          key: 'method',
          defaultValue: 'GET'
        })
        const[link, setLink] = useLocalStorage({
          key: 'link',
          defaultValue: ''
        })

        const handleMethodSelect = (evt) => {
          const {value} = evt.target
          setMethod(value)
          router.push(`/${value}?link=${encodeURIComponent(link)}`);
        }

        const handleSetLink = (evt) => {
          setApiUrl(evt.target.value)
          setLink(evt.target.value)
        }

useEffect(() => {
    setMethod(method)
    setLink(link)
  }, [method]);

console.log('===>method', method)

        const [apiUrl, setApiUrl] = useState('');
  const [queryParams, setQueryParams] = useState([{ key: '', value: '' }]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Добавление нового query параметра
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }]);
  };

  // Удаление параметра
  const removeQueryParam = (index: number) => {
    const newParams = queryParams.filter((_, i) => i !== index);
    setQueryParams(newParams);
  };

  // Обновление параметра
  const updateQueryParam = (index: number, key: string, value: string) => {
    const newParams = [...queryParams];
    newParams[index] = { key, value };
    setQueryParams(newParams);
  };

  // Формирование URL с query параметрами
  const buildUrl = () => {
    const params = queryParams
      .filter(({ key }) => key.trim() !== '')
      .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return params ? `${apiUrl}?${params}` : apiUrl;
  };

  const finalUrl = `/api/proxy?url=${encodeURIComponent(buildUrl())}`;

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setResponse(null);

    if (!apiUrl.trim()) {
      setError('Введите API URL');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(finalUrl);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка запроса');
      }

      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>REST API Client</h2>

<select value={method} onChange={handleMethodSelect}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>

      <input
        type="text"
        value={apiUrl}
        onChange={handleSetLink}
        placeholder="Введите API URL"
        style={inputStyle}
      />

      <h3>Query Parameters</h3>
      {queryParams.map((param, index) => (
        <div key={index} style={{ display: 'flex', marginBottom: 5 }}>
          <input
            type="text"
            value={param.key}
            onChange={(e) => updateQueryParam(index, e.target.value, param.value)}
            placeholder="Key"
            style={inputStyle}
          />
          <input
            type="text"
            value={param.value}
            onChange={(e) => updateQueryParam(index, param.key, e.target.value)}
            placeholder="Value"
            style={inputStyle}
          />
          <button onClick={() => removeQueryParam(index)} style={buttonStyle}>❌</button>
        </div>
      ))}
      <button onClick={addQueryParam} style={buttonStyle}>➕ Добавить параметр</button>

      <button
        onClick={fetchData}
        disabled={loading}
        style={{ ...buttonStyle, background: '#007bff', color: '#fff', width: '100%', marginTop: 10 }}
      >
        {loading ? 'Загрузка...' : 'Отправить GET-запрос'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}

      {response && (
        <pre style={responseStyle}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default RestfulClient;
