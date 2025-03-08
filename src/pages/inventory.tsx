import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InventoryTable from "@/components/inventory/InventoryTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

const InventoryPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Inventory Management | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Manage disaster response inventory and supplies"
        />
      </Helmet>

      {/* Header */}
      <Header isLoggedIn={true} />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1,245</div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Low Stock Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">23</div>
                  <TrendingDown className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Critical Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">5</div>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <ShoppingCart className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Tabs defaultValue="inventory">
              <TabsList className="mb-6">
                <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
                <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="inventory">
                <InventoryTable />
              </TabsContent>

              <TabsContent value="orders">
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Purchase Orders
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This feature will be available soon.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="distribution">
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Distribution Management
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This feature will be available soon.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reports">
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Inventory Reports
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This feature will be available soon.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InventoryPage;
