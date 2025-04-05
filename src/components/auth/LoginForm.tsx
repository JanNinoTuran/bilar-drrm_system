import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  ShieldAlert,
  Eye,
  EyeOff,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LocationState {
  message?: string;
  from?: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // Check if there's a message from redirect (e.g., after signup)
  React.useEffect(() => {
    if (state?.message) {
      setSuccessMessage(state.message);
    }
  }, [state]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Import useAuth hook
  const { login } = useAuth();

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Check if Supabase is properly configured
      if (
        !import.meta.env.VITE_SUPABASE_URL ||
        !import.meta.env.VITE_SUPABASE_ANON_KEY
      ) {
        // For demo purposes, simulate successful login
        setTimeout(() => {
          // Store user data in context using the email from the form
          const emailName = values.email.split("@")[0];
          const nameParts = emailName.split(".");

          login({
            email: values.email,
            firstName: nameParts[0]
              ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1)
              : "",
            lastName: nameParts[1]
              ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1)
              : "",
            location: "Bilar, Bohol",
          });
          navigate("/dashboard");
        }, 1000);
        return;
      }

      // Sign in with Supabase
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

      if (signInError) throw signInError;

      // Get user profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("first_name, last_name, location")
        .eq("id", data.user.id)
        .single();

      // Store user data in context
      login({
        email: values.email,
        firstName: profileData?.first_name || "User",
        lastName: profileData?.last_name || "",
        location: profileData?.location || "",
      });

      // If successful, navigate to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to L.I.G.T.A.S.
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Sign in to access your account and disaster alerts
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">
            Authentication Error
          </AlertTitle>
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800 font-semibold">
            Success
          </AlertTitle>
          <AlertDescription className="text-green-700 text-sm">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">
                  Email
                </FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">
                  Password
                </FormLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between pt-2">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal text-gray-600 cursor-pointer">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />

            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md transition-all duration-200 font-medium shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Create an account
          </a>
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
        <p>© 2024 L.I.G.T.A.S. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginForm;
