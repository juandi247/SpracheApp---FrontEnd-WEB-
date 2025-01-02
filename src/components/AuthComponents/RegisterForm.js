

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { AuthLayoutExpo } from "./AuthLayout";
import { Spinner } from "../../ui/Spinner"; // Ya creaste este componente
import deutschland_register from "../../images/deutschland_register.avif"
import { useEffect } from "react";




export function RegisterFormExpo() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(false); 
    const [loading, setLoading] = useState(false);  // Nuevo estado para manejar la carga
    const navigate = useNavigate();
  
    // Validar email
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  

    useEffect(() => {
      const validateToken = async () => {
        const token = localStorage.getItem("authToken");
  
        if (token) {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/validate/user`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            if (response.status === 200) {
              // Si el token es válido, redirigir al dashboard
              navigate("/dashboard");

            } else {
              // Si no es válido, eliminar el token del almacenamiento
              localStorage.clear();
            }
          } catch (error) {
            console.error("Error validating token:", error);
            localStorage.clear();
          }
        }
      };
  
      validateToken();
    }, [navigate]); 
  
  











    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setSuccess(false);
      setLoading(true);  // Inicia la carga
  
      const { username, email, password } = formData;
  
      if (!username || !email || !password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }
  
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
  
      if (password.length <= 5) {
        setError("Password must be longer than 5 characters.");
        setLoading(false);
        return;
      }

  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        });
  
        if (!response.ok) {
          const errorData = await response.text();
          setError(errorData || "Error desconocido.");
          setLoading(false);
          return;
        }
  
        const data = await response.json();
        setSuccess(true);
        setLoading(false);
        //ASIGN TOken FOR CACHE
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username',data.username)



        setTimeout(() => {
            navigate("/dashboard");  // Redirige después de la animación
          }, 1000);  // Tiempo para ver la animación // Redirige a la página del dashboard

  
      } catch (err) {
        setError(err.message);
        setLoading(false);  // Detiene la carga
      }
    };
  





    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <AuthLayoutExpo
        title="Create your account"
        subtitle="Start your German learning journey today"
        image={deutschland_register}>
        <div className={`relative ${loading ? 'bg-gray-300 opacity-50 pointer-events-none' : ''}`} style={{ position: "relative" }}>
          {/* Aquí el spinner cubre toda la pantalla */}
          {loading && (
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="text-white">Validating Data...</div>
              <Spinner />
            </div>
          )}
  
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
  
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
  
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
  
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">Registration successful!</p>}
  
            <div>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600" disabled={loading}>
                Register
              </Button>
            </div>
  
            <div className="text-center">
              <span className="text-sm text-gray-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-yellow-600 hover:text-yellow-500 underline"
                >
                  Login here
                </button>
              </span>
            </div>
          </form>
        </div>
      </AuthLayoutExpo>
    );
  }
  