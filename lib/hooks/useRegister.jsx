import { useState, useEffect } from "react";

import { useDebounce } from "./useDebounce";

const initialFields = {
  username: "",
  password: "",
  confirmPassword: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  country: "",
};

export default function useRegister() {
  const [error, setError] = useState(null);
  const [f, setF] = useState(initialFields);
  const [refUsername, setRefUsername] = useState("");
  const [position, setPosition] = useState("left");
  const [isLoading, setIsLoading] = useState(false);
  const [validRef, setValidRef] = useState(false);
  const [terms, setTerms] = useState(false);

  const debouncedRefUsername = useDebounce(refUsername, 500);

  useEffect(() => {
    if (debouncedRefUsername) {
      fetch(`/api/users/exists/${debouncedRefUsername}`)
        .then((res) => res.json())
        .then((data) => {
          setValidRef(data.exists);
        });
    }
  }, [debouncedRefUsername]);

  const handleChange = (e) => {
    setF((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleTerms = () => {
    setTerms((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (f.password !== f.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!terms) {
      setError("You must agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    if (f.phone.length < 9) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    if (f.username.length < 3) {
      setError("Username must be at least 3 characters");
      setIsLoading(false);
      return;
    }

    const body = {
      ...f,
      referrer: refUsername,
      position,
      terms,
    };

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(body)

    // const data = await res.json();
  };

  return {
    f,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    validRef,
    refUsername,
    setRefUsername,
    position,
    setPosition,
    handleTerms,
    terms,
  };
}

export { useRegister };
