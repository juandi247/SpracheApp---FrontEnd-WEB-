import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";
import { Spinner } from "../../ui/Spinner"; // Ya creaste este componente
import { AuthLayoutExpo } from "./AuthLayout";
import deutschland_login from "../../images/deutschland_login.avif"
import { useEffect } from "react";





export function LoginFormExpo() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [success,setSuccess] = useState(false); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);  // Nuevo estado para manejar la carga

  const navigate = useNavigate(); // Inicializa el hook para manejar rutas



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
            localStorage.clear();

          }
        } catch (error) {
          console.log("errror")

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

    const { username, password } = formData;

    try {
      const response = await fetch('https://sprachebackend.website/auth/register', {

      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Incorrect username or password");
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
      }, 500);  // Tiempo para ver la animación

    } catch (err) {
      setError("Error in login");
      setLoading(false);  // Detiene la carga
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayoutExpo
      title="Login"
      subtitle="Welcome back! Continue your German learning journey"
      image={deutschland_login}>
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

        <div>
          <Button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-600"
            disabled={loading} // Desactiva el botón cuando está cargando
          >
            {loading ? <Spinner /> : "Sign in"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm">Login successful!</p>}


        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")} // Redirige al formulario de registro
              className="text-yellow-600 hover:text-yellow-500 underline"
            >
              Register here
            </button>
          </span>
        </div>
      </form>
    </AuthLayoutExpo>
  );
}